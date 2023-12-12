import React from 'react'
import TextFieldFormElement from '../fields/text-field';
export type ElementsType = "TextField"


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
	formComponent: React.FC;
	propertiesComponent: React.FC<{
		elementInstance: FormElementInstance;
	}>;
};

export type FormElementInstance = {
  id: string,
  type: ElementsType,
  extraAttributes?:Record<string,any>
}

type FormElementsType = {
	[key in ElementsType]: FormElement;
};


export const FormElements: FormElementsType = {
  TextField:TextFieldFormElement
} 
