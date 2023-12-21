"use client";

import { ElementsType, FormElement, FormElementInstance } from "../form-elements";
import {IoMdCheckbox} from "react-icons/io";

import { z } from "zod";
import { TextFieldPropertiesComponent } from "./components/properties";;
import CheckboxFieldDesignerComponent from "./components/designer/checkbox-field-designer";
import CheckboxFieldFormComponent from "./components/form-component/checkbox-field-form-component";
import CheckboxFieldPropertiesComponent from "./components/properties/checkbox-field-properties-component";

const type: ElementsType = "CheckBoxField";

export const extraAttributes = {
	label: "Chekbox Field",
	helperText: "Helper text",
	required: false,
};

export const propertiesSchema = z.object({
	label: z.string().min(2).max(50),
	helperText: z.string().max(200),
	required: z.boolean().default(false),
});

export type CustomInstance = FormElementInstance & {
	extraAttributes: typeof extraAttributes;
};

export const CheckBoxFieldFormElement: FormElement = {
	type,
	construct: (id: string) => ({
		id,
		type,
		extraAttributes,
	}),
	designerBtnElement: {
		icon: IoMdCheckbox,
		label: "Checkbox Field",
	},
	designerComponent: CheckboxFieldDesignerComponent,
	formComponent: CheckboxFieldFormComponent,
	propertiesComponent: CheckboxFieldPropertiesComponent,
	validate: (formElement: FormElementInstance, currentValue: string) => {
		const elementn = formElement as CustomInstance;
		if (elementn.extraAttributes.required) {
			return currentValue === "true";
		}
		return true;
	},
};




export default CheckBoxFieldFormElement;
