"use client";
import GlobalLoader from '@/components/GlobalLoader'
import React from 'react'

const Loading = () => {
  return (
    <div className='container w-full h-screen flex items-center justify-center'>
            <GlobalLoader/>
    </div>
  )
}

export default Loading