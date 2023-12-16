import React from 'react'
import useDesignerContext from '@/hooks/useDesigner'
import FormElementsSidebar from '../form-elements-sidebar';
import PropertiesFormSidebar from '../properties-form-sidebar';
function DesignerSidebar() {
  const { selectedElement } = useDesignerContext();
  return (
    <div className='w-[400px] max-w-[400px] flex flex-col flex-grow ga  border-l-2 border-muted p-4 bg-background overflow-y-auto h-full'>
      {!selectedElement && <FormElementsSidebar />}
      {selectedElement && <PropertiesFormSidebar/>}
    </div>
  )
}

export default DesignerSidebar
