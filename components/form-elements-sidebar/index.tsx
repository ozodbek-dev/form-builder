import React from "react";
import SidebarBtnElement from "../sidebar-btn-element";
import { FormElements } from "../form-elements";
import { Separator } from "../ui/separator";

function FormElementsSidebar() {
	return (
		<div>
			<p className='text-sm text-foreground/70'>Drag end drop elements</p>
			<Separator className='my-2' />
			<div className='grid grid-cols-1 md:grid-cols-2 gap-2 place-items-center'>
				<p className='text-sm text-muted-foreground col-span-1 md:col-span-2 my-2 place-self-start'>Layout elements</p>
				<SidebarBtnElement formElement={FormElements.TitleField} />
				<SidebarBtnElement formElement={FormElements.SubTitleField} />
				<SidebarBtnElement formElement={FormElements.ParagraphField} />
				<p className='text-sm text-muted-foreground col-span-1 md:col-span-2 my-2 place-self-start'>Form elements</p>
				<SidebarBtnElement formElement={FormElements.TextField} />
			</div>
		</div>
	);
}

export default FormElementsSidebar;
