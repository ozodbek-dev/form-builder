"use client";

import { ElementsType, FormElement, FormElementInstance } from "../form-elements";
import { z } from "zod";
import { LuHeading1 } from "react-icons/lu";
import { TitleFieldFormComponent } from "./components/form-component";
import { TitleFieldDesignerComponent } from "./components/designer";
import TitleFieldPropertiesComponent from "./components/properties/title-field-properties-component";


const type: ElementsType = "TitleField";

export const extraAttributes = {
	title: "Title Field",
};

export const propertiesSchema = z.object({
	title: z.string().min(2).max(50),
});



export const TitleFieldFormElement: FormElement = {
	type,
	construct: (id: string) => ({
		id,
		type,
		extraAttributes,
	}),
	designerBtnElement: {
		icon: LuHeading1,
		label: "Title Field",
	},
	designerComponent: TitleFieldDesignerComponent,
	formComponent: TitleFieldFormComponent,
	propertiesComponent: TitleFieldPropertiesComponent,
	validate: () => true,
};

export type CustomInstance = FormElementInstance & {
	extraAttributes: typeof extraAttributes;
};


export default TitleFieldFormElement;
