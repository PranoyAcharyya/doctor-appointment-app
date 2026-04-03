import React from 'react'
import { Doc } from 'zod/v4/core'

const DoctorsLayout = ({ children }) => {
  return (
    <div className='container mx-auto my-20'>{children}</div>
  )
}

export default DoctorsLayout