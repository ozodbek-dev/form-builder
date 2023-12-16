import React, { useState } from "react";
import DesignerSidebar from "../designer-sidebar";
import { DragEndEvent, useDndMonitor, useDroppable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import { ElementsType, FormElementInstance, FormElements } from "../form-elements";
import useDesignerContext from "@/hooks/useDesigner";
import { idGenerator } from "@/lib/idGenerator";
import DesignerElementWrapper from "../designer-element-wrapper";

function Designer() {
	const { elements, addElement, setSelectedElement, selectedElement, removeElement } = useDesignerContext();
	const droppable = useDroppable({
		id: "designer-drop-area",
		data: {
			isDesignerDropArea: true,
		},
	});

	useDndMonitor({
		onDragEnd: (event: DragEndEvent) => {
			const { active, over } = event;
			console.log(over);
			if (!active || !over) return;
			const isDesignerBtnElement = active.data?.current?.isDesignerBtnElement;
			const isDroppingOverDesignerDropArea = over.data?.current?.isDesignerDropArea;
			// First senario: dropping a sidebar btn elemnt over the designer drop area
			const droppingSidebarBtnElementOverDesignerDropArea = isDesignerBtnElement && isDroppingOverDesignerDropArea;
			if (droppingSidebarBtnElementOverDesignerDropArea) {
				const type = active.data?.current?.type;
				const newElement = FormElements[type as ElementsType].construct(idGenerator());
				addElement(elements.length, newElement);
			}

			//Second Senario:
			const overId = over.data?.current?.elementId;
			const isDroppingOverDesignerElementTopHalf = over.data?.current?.isTopHalfDesignerElement;
			const isDroppingOverDesignerElementBottomHalf = over.data?.current?.isBottomHalfDesignerElement;

			const isDroppingOverDesignerElement = isDroppingOverDesignerElementTopHalf || isDroppingOverDesignerElementBottomHalf;

			const droppingSidebarBtnOverDesignerElement = isDroppingOverDesignerElement;

			if (droppingSidebarBtnOverDesignerElement) {
				const type = active.data?.current?.type;
				const newElement = FormElements[type as ElementsType].construct(idGenerator());
				const overIndexNewElement = elements.findIndex(el => el.id === overId);
				if (overIndexNewElement === -1) throw new Error("Element not found");

				let indexForNewElement = overIndexNewElement;

				if (isDroppingOverDesignerElementBottomHalf) {
					indexForNewElement++;
				}

				addElement(indexForNewElement, newElement);
				console.log(newElement, "possition changed Element");
			}

			// Third senario:
			const isDraggingDesignerElement = active.data?.current?.isDesignerElement;
			const draggingDesignerElementOverAnotherDesignerElement = isDraggingDesignerElement && isDroppingOverDesignerElement;
			if (draggingDesignerElementOverAnotherDesignerElement) {
				const activeId = active.data?.current?.elementId;
				const overId = over.data?.current?.elementId;
				const activeElementIndex = elements.findIndex(el => el.id === activeId);
				const overElementIndex = elements.findIndex(el => el.id === overId);

				if (activeElementIndex === -1 || overElementIndex === -1) throw new Error("Element not found");
				const activeElement = { ...elements[activeElementIndex] };
				removeElement(activeId);
				let indexForNewElement = overElementIndex;

				if (isDroppingOverDesignerElementBottomHalf) {
					indexForNewElement++;
				}
				addElement(indexForNewElement, activeElement);
			}
		},
	});

	return (
		<div className=' flex w-full h-full'>
			<div
				className='w-full p-4'
				onClick={() => {
					if (selectedElement) setSelectedElement(null);
				}}
			>
				<div
					ref={droppable.setNodeRef}
					className={cn(
						"bg-background max-w-[920px] h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-2 overflow-y-auto",
						droppable.isOver && "ring-2 ring-primary/20"
					)}
				>
					{!droppable.isOver && elements?.length === 0 && (
						<p className='text-3xl text-muted-foreground flex flex-grow items-center font-bold'>Drop here</p>
					)}
					{droppable.isOver && elements?.length === 0 && (
						<div className='p-4 w-full'>
							<div className='h-[120px] rounded-md bg-primary/20'></div>
						</div>
					)}
					{elements?.length > 0 && (
						<div className='flex flex-col  gap-2 p-4 w-full'>
							{elements.map(element => (
								<DesignerElementWrapper key={element.id} element={element} />
							))}
						</div>
					)}
				</div>
			</div>
			<DesignerSidebar />
		</div>
	);
}

export default Designer;
