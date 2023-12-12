"use client";
import React from 'react'

import { ElementsType, FormElement } from '../form-elements';
import { MdTextFields } from 'react-icons/md';

const type:ElementsType ="TextField"

export const TextFieldFormElement: FormElement = {
  type,
  construct: (id:string) => ({
    id,
    type,
    extraAttributes: {
      label: "Text Field",
      helperText: "Helper text",
      required: false,
      placeholder: "Value here...",
    }
  }),
  designerBtnElement: {
    icon: MdTextFields,
    label: "Text Field",
  },
  designerComponent: () => <div>Designer component</div>,
  formComponent: () => <div>Form Component</div>,
  propertiesComponent: () => <div>Properties Components</div>,

}

export default TextFieldFormElement;
