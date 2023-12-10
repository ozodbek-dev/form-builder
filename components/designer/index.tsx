import React from 'react'
import DesignerSidebar from '../designer-sidebar'

function Designer() {
  return (
    <div className=' flex w-full h-full'>
      <div className="w-full p-4">
        <div className="bg-background max-w-[920px] h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-2 overflow-y-auto">
          <p className='text-3xl text-muted-foreground flex flex-grow items-center font-bold'>
            Drop here
          </p>
        </div>
      </div>
      <DesignerSidebar/>
    </div>
  )
}

export default Designer
