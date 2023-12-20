"use client";

import { ElementsType, FormElement, FormElementInstance } from "../form-elements";
import { z } from "zod";
import { LuSeparatorHorizontal } from "react-icons/lu";
import { SpacerFieldFormComponent } from "./components/form-component";
import { SpacerFieldDesignerComponent } from "./components/designer";
import SpacerFieldPropertiesComponent from "./components/properties/spacer-field-properties-component";

const type: ElementsType = "SpacerField";

export const extraAttributes = {
	height:20 //px
};

export const propertiesSchema = z.object({
	height: z.number().min(5).max(200),
});

const SpacerFieldFormElement: FormElement = {
	type,
	construct: (id: string) => ({
		id,
		type,
		extraAttributes,
	}),
	designerBtnElement: {
		icon: LuSeparatorHorizontal,
		label: "Spacer  Field",
	},
	designerComponent: SpacerFieldDesignerComponent,
	formComponent: SpacerFieldFormComponent,
	propertiesComponent: SpacerFieldPropertiesComponent,
	validate: () => true,
};

export type CustomInstance = FormElementInstance & {
	extraAttributes: typeof extraAttributes;
};

export default SpacerFieldFormElement;
