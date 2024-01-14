import React from 'react'

function Layout({children}) {
  return (
    <div className='bg-black h-screen text-white items-center m-auto flex'>{children}</div>
  )
}

export default Layout