"use client"
import React from 'react'
import { FormElementInstance, FormElements } from '../form-elements'

function DesignerElementWrapper({ element }:{element: FormElementInstance}) {
  const DesignerElement = FormElements[element.type].designerComponent
  return <DesignerElement elementInstance={element}/>
}

export default DesignerElementWrapper
