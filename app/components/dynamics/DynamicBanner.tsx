import { StaticImageData } from 'next/image';
import React from 'react'

export const DynamicBanner = ({
    bannerImage,
    title,
    description,
}: {
    bannerImage: string;
    title: string;
    description: string;
}) => {
    
  return (
    <div
    style={{
        backgroundImage: `url(${bannerImage})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
    }}
    className='h-screen w-full bg-cover bg-center bg-no-repeat bg-fixed bg-opacity-50'>
            <p className=' dark:bg-black text-white text-4xl font-bold text-center'>{title}</p>
            <p className=' dark:bg-black text-white text-4xl font-bold text-center'>{description}</p>
              
    </div>
  )
}
