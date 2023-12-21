"use client";

import { ElementsType, FormElement, FormElementInstance } from "../form-elements";

import { z } from "zod";
import { TextAreaFieldDesignerComponent } from "./components/designer";
import { BsTextareaResize } from "react-icons/bs";
import TextAreaFieldPropertiesComponent from "./components/properties/text-area-field-properties-component";
import TextAreaFieldFormComponent from "./components/form-component/text-area-field-form-component";

const type: ElementsType = "TextAreaField";

export const extraAttributes = {
	label: "TextArea Field",
	helperText: "Helper text",
	required: false,
	placeholder: "Value here...",
	rows: 1
};

export const propertiesSchema = z.object({
	label: z.string().min(2).max(50),
	helperText: z.string().max(200),
	placeholder: z.string().max(50),
	required: z.boolean().default(false),
	rows: z.number().min(1).max(10),
});

export type CustomInstance = FormElementInstance & {
	extraAttributes: typeof extraAttributes;
};

const TextAreaFieldFormElement: FormElement = {
	type,
	construct: (id: string) => ({
		id,
		type,
		extraAttributes,
	}),
	designerBtnElement: {
		icon: BsTextareaResize,
		label: "TextArea Field",
	},
	designerComponent: TextAreaFieldDesignerComponent,
	formComponent: TextAreaFieldFormComponent,
	propertiesComponent: TextAreaFieldPropertiesComponent,
	validate: (formElement: FormElementInstance, currentValue: string) => {
		const elementn = formElement as CustomInstance;
		if (elementn.extraAttributes.required) {
			return currentValue.length > 0;
		}
		return true;
	},
};




export default TextAreaFieldFormElement;
