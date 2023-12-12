import React from 'react'
import { FormElements } from '../form-elements'
import SidebarBtnElement from '../sidebar-btn-element'
function DesignerSidebar() {

  return (
    <div className='w-[400px] max-w-[400px] flex flex-col flex-grow ga  border-l-2 border-muted p-4 bg-background overflow-y-auto h-full'>
      Elements 
      <SidebarBtnElement formElement={FormElements.TextField}/>
    </div>
  )
}

export default DesignerSidebar
