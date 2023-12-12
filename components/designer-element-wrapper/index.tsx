"use client";
import React, { useState } from "react";
import { FormElementInstance, FormElements } from "../form-elements";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { Button } from "../ui/button";
import { BiSolidTrash } from "react-icons/bi";
import useDesignerContext from "@/hooks/useDesigner";
import { cn } from "@/lib/utils";

function DesignerElementWrapper({ element }: { element: FormElementInstance }) {
	const [mouseIsOver, setMouseIsover] = useState<boolean>(false);
	const { removeElement } = useDesignerContext();

	const topHalf = useDroppable({
		id: `${element.id}-top`,
		data: {
			type: element.type,
			elementId: element.id,
			isTopHalfDesignerElement: true,
		},
	});
	const bottomHalf = useDroppable({
		id: `${element.id}-bottom`,
		data: {
			type: element.type,
			elementId: element.id,
			isBottomHalfDesignerElement: true,
		},
	});
	const draggable = useDraggable({
		id: element.id + "-drag-handler",
		data: {
			type: element.type,
			elementId: element.id,
			isDesignerElement: true,
		},
	});
	if (draggable.isDragging) return null;
	const DesignerElement = FormElements[element.type].designerComponent;
	return (
		<div
			ref={draggable.setNodeRef}
			{...draggable.listeners}
			{...draggable.attributes}
			className='relative h-[120px] flex flex-col  text-foreground hover:cursor-pointer rounded-md ring-1 ring-a ccent ring-inset w-full'
			onMouseEnter={() => setMouseIsover(true)}
			onMouseLeave={() => setMouseIsover(false)}
		>
			<div ref={topHalf.setNodeRef} className='absolute w-full rounded-t-md h-1/2' />
			<div ref={bottomHalf.setNodeRef} className='absolute  w-full bottom-0 rounded-b-md h-1/2' />
			{mouseIsOver && (
				<>
					<div className='absolute right-0 h-full'>
						<Button
							className='flex justify-center h-full rounded-md rounded-l-none  bg-red-500'
							variant={"outline"}
							onClick={() => {
								removeElement(element.id);
							}}
						>
							<BiSolidTrash className='h-6 w-6' />
						</Button>
					</div>
					<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse'>
						<p className='text-muted-foreground  text-sm  '>Click for properties or drag to move</p>
					</div>
				</>
			)}
			{topHalf.isOver && <div className='absolute top-0 w-full rounded-md h-[7px] bg-primary rounded-b-none' />}
			<div
				className={cn(
					"flex w-full h-[120px] items-center rounded-md  bg-accent/40 px-4 py-2 pointer-events-none opacity-100",
					mouseIsOver && "opacity-30"
				)}
			>
				<DesignerElement elementInstance={element} />
			</div>

			{bottomHalf.isOver && <div className='absolute bottom-0 w-full rounded-md h-[7px] bg-primary rounded-t-none' />}
		</div>
	);
}

export default DesignerElementWrapper;
