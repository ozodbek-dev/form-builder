"use client";
import React from "react";

import { ElementsType, FormElement, FormElementInstance } from "../form-elements";
import { MdTextFields } from "react-icons/md";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

import { z } from "zod";
import { TextFieldFormComponent } from "./components/form-component";
import { TextFieldPropertiesComponent } from "./components/properties";
import { TextFieldDesignerComponent } from "./components/designer";

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

export type CustomInstance = FormElementInstance & {
	extraAttributes: typeof extraAttributes;
};

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
	designerComponent: TextFieldDesignerComponent,
	formComponent: TextFieldFormComponent,
	propertiesComponent: TextFieldPropertiesComponent,
	validate: (formElement: FormElementInstance, currentValue: string) => {
		const elementn = formElement as CustomInstance;
		if (elementn.extraAttributes.required) {
			return currentValue.length > 0;
		}
		return true;
	},
};




export default TextFieldFormElement;
