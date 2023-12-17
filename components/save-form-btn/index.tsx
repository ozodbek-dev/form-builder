import React from 'react'
import { Button } from '../ui/button'
import { HiSaveAs } from 'react-icons/hi'
import useDesignerContext from '@/hooks/useDesigner'
function SaveFormBtn() {
  const { elements } = useDesignerContext();
  const updateContent = async () => {
    try {
      const JsonElements = JSON.stringify(elements);
    } catch (error) {
      
    }
  }
  return (
    <Button variant={'outline'} className='gap-2'>
      <HiSaveAs/>
      Save
    </Button>
  )
}

export default SaveFormBtn
