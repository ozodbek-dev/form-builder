import React from 'react'
import {ImSpinner2} from 'react-icons/im'

function loading() {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <ImSpinner2 className="animate-spin h-12 w-12"/>
    </div>
  ) 
}

export default loading
