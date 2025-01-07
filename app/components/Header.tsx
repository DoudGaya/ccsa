import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import logo from '@/app/assets/img/cosmopolitan-logo.png'

const Header = () => {
  return (
    <div className=' w-full top-0 fixed bg-white/50 z-50'>
      <div className="max-w-7xl mx-auto flex items-center px-4 sm:px-6 lg:px-8 justify-between">
        <Link href='/' className=' flex items-center'>
          <Image src={logo} alt='Cosmopolitan University Abuja' className=' h-16 px-0 object-left max-w-min  object-contain ' width={120} height={120} />
          <p className='text-2xl font-bold text-gray-800'> CCSA - Cosmopolitan</p>
        </Link>
        <div className="">Nav Links </div>
      </div>
    </div>
  )
}

export default Header