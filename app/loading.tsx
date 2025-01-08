import React from 'react'
import logo from '@/app/assets/img/ccsa-logo.png'
import Image from 'next/image'


const loading = () => {
  return (
    <div className='h-screen flex items-center justify-center w-full bg-white'>
      <Image src={logo} alt='Cosmopolitan University Abuja' className=' h-12 px-0 object-left max-w-min  object-contain ' width={300} height={300} />
    </div>
  )
}

export default loading