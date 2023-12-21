"use client";

import { ElementsType, FormElement, FormElementInstance } from "../form-elements";

import { z } from "zod";
import { NumberFieldFormComponent } from "./components/form-component";
import { TextFieldPropertiesComponent } from "./components/properties";
import { NumberFieldDesignerComponent, TextFieldDesignerComponent } from "./components/designer";
import { Bs123 } from "react-icons/bs";

const type: ElementsType = "NumberField";

export const extraAttributes = {
	label: "Number Field",
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

const NumberFieldFormElement: FormElement = {
	type,
	construct: (id: string) => ({
		id,
		type,
		extraAttributes,
	}),
	designerBtnElement: {
		icon: Bs123,
		label: "Number Field",
	},
	designerComponent: NumberFieldDesignerComponent,
	formComponent: NumberFieldFormComponent,
	propertiesComponent: TextFieldPropertiesComponent,
	validate: (formElement: FormElementInstance, currentValue: string) => {
		const elementn = formElement as CustomInstance;
		if (elementn.extraAttributes.required) {
			return currentValue.length > 0;
		}
		return true;
	},
};




export default NumberFieldFormElement;
