import React from 'react'
import { MediaBanner } from '../_componentss/MediaBanner'
import mediaBannerImage from '@/public/media-banner.jpg'


const bannerData =   {
    title: "Photos",
    description:
      "View our gallery of photos from our events, workshops, and training sessions.",
    href: "/media/photos",
  }


const page = () => {
  return (
    <div className='flex flex-col items-center justify-center'>
        <MediaBanner 
            bannerImage={mediaBannerImage.src}
            title={bannerData.title}
            description={bannerData.description}
        />
        
    </div>
  )
}

export default page