import React from 'react'

function layout({children }: {children: React.ReactNode}) {
  return (
    <div className='w-full flex-grow flex-col  mx-auto'>
      {children}
    </div>
  )
}

export default layout
