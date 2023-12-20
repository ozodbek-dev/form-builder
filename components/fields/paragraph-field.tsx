"use client";

import { ElementsType, FormElement, FormElementInstance } from "../form-elements";
import { z } from "zod";
import { ParagraphFieldFormComponent, TitleFieldFormComponent } from "./components/form-component";
import { BsTextParagraph } from "react-icons/bs";
import ParagrahpFieldDesignerComponent from "./components/designer/paragraph-field-designer";
import ParagraphFieldPropertiesComponent from "./components/properties/paragraph-field-properties-component";



const type: ElementsType = "ParagraphField";

export const extraAttributes = {
	text: "Text here",
};

export const propertiesSchema = z.object({
	text: z.string().min(3).max(500),
});



 const ParagraphFieldFormElement: FormElement = {
	type,
	construct: (id: string) => ({
		id,
		type,
		extraAttributes,
	}),
	designerBtnElement: {
		icon: BsTextParagraph,
		label: "Paragraph Field",
	},
	designerComponent: ParagrahpFieldDesignerComponent,
	formComponent: ParagraphFieldFormComponent,
	propertiesComponent: ParagraphFieldPropertiesComponent,
	validate: () => true,
};

export type CustomInstance = FormElementInstance & {
	extraAttributes: typeof extraAttributes;
};


export default ParagraphFieldFormElement;
