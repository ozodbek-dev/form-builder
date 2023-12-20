"use client";

import { ElementsType, FormElement } from "../form-elements";
import { SeparatorFieldFormComponent } from "./components/form-component";
import { SeparatorFieldDesignerComponent } from "./components/designer";

import {RiSeparator} from "react-icons/ri";
import SeparatorFieldPropertiesComponent from "./components/properties/separator-field-properties-component";
const type: ElementsType = "SeparatorField";


 const SeparatorFieldFormElement: FormElement = {
	type,
	construct: (id: string) => ({
		id,
		type,
	}),
	designerBtnElement: {
		icon: RiSeparator,
		label: "Separator Field",
	},
	designerComponent: SeparatorFieldDesignerComponent,
	formComponent: SeparatorFieldFormComponent,
	propertiesComponent: SeparatorFieldPropertiesComponent,
	validate: () => true,
};

export default SeparatorFieldFormElement;
