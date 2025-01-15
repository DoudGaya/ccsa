import { StaticImageData } from 'next/image';
import React from 'react'

export const DynamicBanner = ( {
    bannerImage,
    title,
    description,
}: {
    bannerImage: StaticImageData | string;
    title: string;
    description: string;
}) => {

    let image;

    if (typeof bannerImage === 'string') {
        image = bannerImage;
    }
    else {
        image = bannerImage.src;
    }
    
  return (
    <div
    style={{
        backgroundImage: `url(${image})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
    }}
    
    className='h-screen'>

    </div>
  )
}
