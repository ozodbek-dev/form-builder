import React from "react";
import TextFieldFormElement from "../fields/text-field";
export type ElementsType = "TextField";

export type SubmitFunction = (key: string, value: string) => void; 

export type FormElement = {
	type: ElementsType;
	construct: (id: string) => FormElementInstance;
	designerComponent: React.FC<{
		elementInstance: FormElementInstance;
	}>;
	designerBtnElement: {
		icon: React.ElementType;
		label: string;
	};
	formComponent: React.FC<{
		elementInstance: FormElementInstance;
		submitValue?: SubmitFunction
		isInvalid?:boolean
	}>;
	propertiesComponent: React.FC<{
		elementInstance: FormElementInstance;
	}>;
	validate: (formElement:FormElementInstance, currentValue: string) => boolean;
};

export type FormElementInstance = {
	id: string;
	type: ElementsType;
	extraAttributes?: Record<string, any>;
};

type FormElementsType = {
	[key in ElementsType]: FormElement;
};

export const FormElements: FormElementsType = {
	TextField: TextFieldFormElement,
};
