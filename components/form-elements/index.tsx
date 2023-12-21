import React from "react";
import TextFieldFormElement from "../fields/text-field";
import TitleFieldFormElement from "../fields/title-field";
import SubTitleFieldFormElement from "../fields/subtitle-field";
import ParagraphFieldFormElement from "../fields/paragraph-field";
import SeparatorFieldFormElement from "../fields/separator-field";
import SpacerFieldFormElement from "../fields/spacer-field";
import NumberFieldFormElement from "../fields/number-field";
import TextAreaFieldFormElement from "../fields/text-area-field";
import DateFieldFormElement from "../fields/date-field";
import SelectFieldFormElement from "../fields/select-field";
export type ElementsType =
	"TextField"
	| "TitleField"
	| "SubTitleField"
	| "ParagraphField"
	| "SeparatorField"
	| "SpacerField"
	| "NumberField"
	| "TextAreaField"
	| "DateField"
	| "SelectField"

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
		submitValue?: SubmitFunction;
		isInvalid?: boolean;
		defaultValue?: string;
	}>;
	propertiesComponent: React.FC<{
		elementInstance: FormElementInstance;
	}>;
	validate: (formElement: FormElementInstance, currentValue: string) => boolean;
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
	TitleField: TitleFieldFormElement,
	SubTitleField: SubTitleFieldFormElement,
	ParagraphField: ParagraphFieldFormElement,
	SeparatorField: SeparatorFieldFormElement,
	SpacerField: SpacerFieldFormElement,
	NumberField: NumberFieldFormElement,
	TextAreaField: TextAreaFieldFormElement,
	DateField: DateFieldFormElement,
	SelectField: SelectFieldFormElement,
};
