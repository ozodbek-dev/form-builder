import React from "react";
import { FormElement } from "../form-elements";
import { Button } from "../ui/button";
import { useDraggable } from "@dnd-kit/core";
import { is } from "date-fns/locale";
import { cn } from "@/lib/utils";

function SidebarBtnElement({ formElement }: { formElement: FormElement }) {
	const draggable = useDraggable({
		id: `designer-btn-${formElement.type}`,
		data: {
			type: formElement.type,
			isDesignerBtnElement: true,
		},
	});
	const { icon: Icon, label } = formElement.designerBtnElement;
	return (
    <Button
      ref={draggable.setNodeRef}
			variant='outline'
			className={cn("flex flex-col gap-2 h-[120px] w-[120px] cursor-grap",draggable.isDragging && "ring-2 ring-primary")}
			{...draggable.listeners}
			{...draggable.attributes}
		>
			<Icon className='h-8 w-8 text-primary cursor-grap' />
			<p className='text-xs'>{label}</p>
		</Button>
	);
}
export function SidebarBtnElementDragOverlay({ formElement }: { formElement: FormElement }) {
	
	const { icon: Icon, label } = formElement.designerBtnElement;
	return (
    <Button
			variant='outline'
			className="flex flex-col gap-2 h-[120px] w-[120px] cursor-grap"
		>
			<Icon className='h-8 w-8 text-primary cursor-grap' />
			<p className='text-xs'>{label}</p>
		</Button>
	);
}

export default SidebarBtnElement;
