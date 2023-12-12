"use client";
import React from "react";

import { ElementsType, FormElement, FormElementInstance } from "../form-elements";
import { MdTextFields } from "react-icons/md";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const type: ElementsType = "TextField";

const extraAttributes = {
	label: "Text Field",
	helperText: "Helper text",
	required: false,
	placeholder: "Value here...",
};

export const TextFieldFormElement: FormElement = {
	type,
	construct: (id: string) => ({
		id,
		type,
		extraAttributes,
	}),
	designerBtnElement: {
		icon: MdTextFields,
		label: "Text Field",
	},
	designerComponent: DesignerComponent,
	formComponent: () => <div>Form Component</div>,
	propertiesComponent: () => <div>Properties Components</div>,
};

type CustomInstance = FormElementInstance & {
	extraAttributes: typeof extraAttributes;
};

function DesignerComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
  const element = elementInstance as CustomInstance;
  const {label,placeholder,helperText,required} = element.extraAttributes 
	return (
		<div className='flex flex-col gap-2 w-full '>
			<Label>
				{label} {required && "*"}
      </Label>
      <Input readOnly disabled placeholder={placeholder} />
      {helperText && <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>}
		</div>
	);
}

export default TextFieldFormElement;
