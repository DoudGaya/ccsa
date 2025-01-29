import React from 'react'
import { MediaBanner } from '../_componentss/MediaBanner'
import mediaBanner from '@/public/media-banner.jpg'


const pageData = {
    title: "Live TV",
    description:
      "We currently have no Live TV Availbale",
    href: "/media/live-tv",
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