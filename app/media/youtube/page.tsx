import React from 'react'
import { MediaBanner } from '../_componentss/MediaBanner'
import mediaBanner from '@/public/media-banner.jpg'


const pageData = {
    title: "YouTube",
    description:
      "We currently have no YouTube Video Availbale",
    href: "/media/youtube",
  }

const page = () => {
  return (
    <div className='flex flex-col items-center justify-center'>
        <MediaBanner 
            bannerImage={mediaBanner.src}
            description={pageData.description}
            title={pageData.title}
        />

    </div>
  )
}

export default page