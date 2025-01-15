import { StaticImageData } from 'next/image';
import React from 'react'

export const DynamicBanner = ( {
    bannerImage,
    title,
}: {
    bannerImage: StaticImageData;
    title: string;
}) => {
  return (
    <div
    style={{
        backgroundImage: `url(${bannerImage.src})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
    }}
    
    className='h-screen'>

    </div>
  )
}
