"use client";

import { ElementsType, FormElement, FormElementInstance } from "../form-elements";
import { z } from "zod";
import {  LuHeading2 } from "react-icons/lu";
import { SubTitleFieldFormComponent } from "./components/form-component";
import { SubTitleFieldDesignerComponent } from "./components/designer";
import TitleFieldPropertiesComponent from "./components/properties/title-field-properties-component";


const type: ElementsType = "SubTitleField";

export const extraAttributes = {
	title: "SubTitle Field",
};

export const propertiesSchema = z.object({
	title: z.string().min(2).max(50),
});



 const SubTitleFieldFormElement: FormElement = {
	type,
	construct: (id: string) => ({
		id,
		type,
		extraAttributes,
	}),
	designerBtnElement: {
		icon: LuHeading2,
		label: "SubTitle Field",
	},
	designerComponent: SubTitleFieldDesignerComponent,
	formComponent: SubTitleFieldFormComponent,
	propertiesComponent: TitleFieldPropertiesComponent,
	validate: () => true,
};

export type CustomInstance = FormElementInstance & {
	extraAttributes: typeof extraAttributes;
};


export default SubTitleFieldFormElement;
