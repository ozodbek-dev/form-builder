"use client";

import { ElementsType, FormElement, FormElementInstance } from "../form-elements";

import { z } from "zod";
import { TextFieldFormComponent } from "./components/form-component";
import { TextFieldPropertiesComponent } from "./components/properties";
import { TextFieldDesignerComponent } from "./components/designer";
import { BsFillCalendarDateFill } from "react-icons/bs";
import DateFieldDesignerComponent from "./components/designer/date-field-designer";
import DateFieldFormComponent from "./components/form-component/date-field-form-component";
import DateFieldPropertiesComponent from "./components/properties/date-field-properties-component";

const type: ElementsType = "DateField";

export const extraAttributes = {
	label: "Date Field",
	helperText: "Pick a date",
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

 const DateFieldFormElement: FormElement = {
	type,
	construct: (id: string) => ({
		id,
		type,
		extraAttributes,
	}),
	designerBtnElement: {
		icon: BsFillCalendarDateFill,
		label: "Date Field",
	},
	designerComponent: DateFieldDesignerComponent,
	formComponent: DateFieldFormComponent,
	propertiesComponent: DateFieldPropertiesComponent,
	validate: (formElement: FormElementInstance, currentValue: string) => {
		const elementn = formElement as CustomInstance;
		if (elementn.extraAttributes.required) {
			return currentValue.length > 0;
		}
		return true;
	},
};




export default DateFieldFormElement;
