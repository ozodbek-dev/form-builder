import useDesignerContext from '@/hooks/useDesigner';
import React from 'react'
import { FormElements } from '../form-elements';
import {AiOutlineClose} from 'react-icons/ai';
import { Button } from '../ui/button';

function PropertiesFormSidebar() {
  const { selectedElement, setSelectedElement } = useDesignerContext();
  if(!selectedElement) return null 
  const PropertiesForm = FormElements[selectedElement?.type]?.propertiesComponent; 
  return <div className='flex flex-col p-2 '>
    <div className="flex justify-between items-center"> 
      <p className='text-sm text-foreground/70'>Element Properties</p>
      <Button size={"icon"} variant={"outline"} onClick={() => {
        setSelectedElement(null)
      }}>
        <AiOutlineClose/>
      </Button>
    </div>
    <PropertiesForm elementInstance={selectedElement}/> 
  </div>;
}

export default PropertiesFormSidebar;
