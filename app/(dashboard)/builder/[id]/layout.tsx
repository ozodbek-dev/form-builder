import React from 'react'

function layout({children }: {children: React.ReactNode}) {
  return (
    <div className='w-full flex-grow mx-auto'>
      {children}
    </div>
  )
}

export default layout
