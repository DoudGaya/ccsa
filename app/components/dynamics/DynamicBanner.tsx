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
    className='h-[90vh] w-full flex bg-gradient-to-b from-black/20 via-black/30 to-black bg-blend-overlay relative bg-cover bg-center bg-no-repeat items-end text-blue-50 bg-fixed'>
    <div className="bg-gradient-to-b flex-col from-transparent justify-end via-black/80 to-black bg-opacity-50 items-end w-full flex ">
       <div className="max-w-7xl space-y-3 text-start mx-auto pb-6 md:pb-10 px-8 pt-20">
       <h1 className='text-2xl md:text-4xl xl:text-5xl font-bold font-main'>{title}</h1>
       <h2 className='font-poppins text-sm md:text-md italic'> {description} </h2>
       </div>
    </div>
    </div>
  )
}
