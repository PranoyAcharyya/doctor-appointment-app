import React from 'react'

const SpecialityPage = async({params}) => {
    const { specialty } = await params;
  return (
    <div>page{specialty}</div>
  )
}

export default SpecialityPage