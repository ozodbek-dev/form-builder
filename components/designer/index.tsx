import React, { useState } from "react";
import DesignerSidebar from "../designer-sidebar";
import { DragEndEvent, useDndMonitor, useDroppable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import { ElementsType, FormElementInstance, FormElements } from "../form-elements";
import useDesignerContext from "@/hooks/useDesigner";
import { idGenerator } from "@/lib/idGenerator";
import DesignerElementWrapper from "../designer-element-wrapper";

function Designer() {
	const { elements, addElement, setSelectedElement, selectedElement } = useDesignerContext();
	const droppable = useDroppable({
		id: "designer-drop-area",
		data: {
			isDesignerDropArea: true,
		},
	});

	useDndMonitor({
		onDragEnd: (event: DragEndEvent) => {
			const { active, over } = event;
			if (!active || !over) return;
			const isDesignerBtnElement = active.data?.current?.isDesignerBtnElement;
			if (isDesignerBtnElement) {
				const type = active.data?.current?.type;
				const newElement = FormElements[type as ElementsType].construct(idGenerator());
				addElement(0, newElement);
				console.log(newElement);
			}
		},
	});

	return (
		<div className=' flex w-full h-full'>
			<div className='w-full p-4' onClick={() => {
				if(selectedElement) setSelectedElement(null)
			}}>
				<div
					ref={droppable.setNodeRef}
					className={cn(
						"bg-background max-w-[920px] h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-2 overflow-y-auto",
						droppable.isOver && "ring-2 ring-primary/20"
					)}
				>
					{!droppable.isOver && elements?.length === 0 && <p className='text-3xl text-muted-foreground flex flex-grow items-center font-bold'>Drop here</p>}
					{droppable.isOver && elements?.length === 0 && (
						<div className='p-4 w-full'>
							<div className='h-[120px] rounded-md bg-primary/20'></div>
						</div>
					)}
					{
						elements?.length > 0 && (
							<div className="flex flex-col  gap-2 p-4 w-full">
								{
									elements.map(element => (
										<DesignerElementWrapper key={element.id} element={element}/>
									))
								}
							 </div>
						)
					}
				</div>
			</div>
			<DesignerSidebar />
		</div>
	);
}

export default Designer;
