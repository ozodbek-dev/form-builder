"use client";

import { ElementsType, FormElement, FormElementInstance } from "../form-elements";
import {RxDropdownMenu} from "react-icons/rx";

import { z } from "zod";
import SelectFieldDesignerComponent from "./components/designer/select-field-designer";
import SelectFieldPropertiesComponent from "./components/properties/select-field-properties-component";
import SelectFieldFormComponent from "./components/form-component/select-field-form-component";

const type: ElementsType = "SelectField";

export const extraAttributes = {
	label: "Select Field",
	helperText: "Helper text",
	required: false,
	placeholder: "Value here...",
	options:[]
};

export const propertiesSchema = z.object({
	label: z.string().min(2).max(50),
	helperText: z.string().max(200),
	placeholder: z.string().max(50),
	required: z.boolean().default(false),
	options: z.array(z.string()).default([]),
});

export type CustomInstance = FormElementInstance & {
	extraAttributes: typeof extraAttributes;
};

export const SelectFieldFormElement: FormElement = {
	type,
	construct: (id: string) => ({
		id,
		type,
		extraAttributes,
	}),
	designerBtnElement: {
		icon: RxDropdownMenu,
		label: "Select Field",
	},
	designerComponent: SelectFieldDesignerComponent,
	formComponent: SelectFieldFormComponent,
	propertiesComponent: SelectFieldPropertiesComponent,
	validate: (formElement: FormElementInstance, currentValue: string) => {
		const elementn = formElement as CustomInstance;
		if (elementn.extraAttributes.required) {
			return currentValue.length > 0;
		}
		return true;
	},
};




export default SelectFieldFormElement;
