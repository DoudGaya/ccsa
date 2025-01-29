import React from 'react'
import { MediaBanner } from '../_componentss/MediaBanner'


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
            bannerImage='/images/photos-banner.jpg'
            title={bannerData.title}
            description={bannerData.description}
        />
        
    </div>
  )
}

export default page