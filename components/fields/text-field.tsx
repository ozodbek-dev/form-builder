"use client";
import React from "react";

import { ElementsType, FormElement, FormElementInstance } from "../form-elements";
import { MdTextFields } from "react-icons/md";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import PropertiesComponent from "./components/properties-component";
import { z } from "zod";
import FormComponent from "./components/form-component";
const type: ElementsType = "TextField";

export const extraAttributes = {
	label: "Text Field",
	helperText: "Helper text",
	required: false,
	placeholder: "Value here...",
};

export const propertiesSchema = z.object({
	label: z.string().min(2).max(50),
	helperText: z.string().max(200),
	placeholder: z.string().max(50),
	required: z.boolean().default(false),
});

export const TextFieldFormElement: FormElement = {
	type,
	construct: (id: string) => ({
		id,
		type,
		extraAttributes,
	}),
	designerBtnElement: {
		icon: MdTextFields,
		label: "Text Field",
	},
	designerComponent: DesignerComponent,
	formComponent: FormComponent,
	propertiesComponent: PropertiesComponent,
	validate: (formElement: FormElementInstance, currentValue: string) => {
		const elementn = formElement as CustomInstance;
		if (elementn.extraAttributes.required) {
			return currentValue.length  > 0
		}
		return true;
	}
};

export type CustomInstance = FormElementInstance & {
	extraAttributes: typeof extraAttributes;
};
function DesignerComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
	const element = elementInstance as CustomInstance;
	const { label, placeholder, helperText, required } = element.extraAttributes;

	return (
		<div className='flex flex-col gap-2 w-full '>
			<Label>
				{label} {required && "*"}
			</Label>
			<Input readOnly disabled placeholder={placeholder} />
			{helperText && <p className='text-muted-foreground text-[0.8rem]'>{helperText}</p>}
		</div>
	);
}

export default TextFieldFormElement;
