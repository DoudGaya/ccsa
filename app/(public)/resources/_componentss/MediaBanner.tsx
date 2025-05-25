import { StaticImageData } from 'next/image';
import React from 'react'

export const MediaBanner = ({
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
    className='h-[70vh] w-full flex bg-gradient-to-b bg-black/50 bg-blend-overlay relative bg-cover bg-center bg-no-repeat text-blue-50 bg-fixed'>
    <div className="bg-gradient-to-b flex-col from-transparent justify-center  w-full flex ">
       <div className=" max-w-7xl space-y-3 text-start mx-auto pb-6 md:pb-10 px-8 pt-20">
       <h1 className=' text-2xl md:text-4xl xl:text-5xl font-bold font-blog'>{title}</h1>
       <h2 className=' font-poppins lg:text-xl text-sm md:text-md italic '> {description} </h2>
       </div>
    </div>
    </div>
  )
}
