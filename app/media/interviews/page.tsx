import React from 'react'
import { MediaBanner } from '../_componentss/MediaBanner'
import MediaBannnerIMG from '@/public/media-banner.jpg'


const pageData = {
    title: "Interviews",
    description:
      "We currently have no interview",
    href: "/media/interviews",
  }

const page = () => {
  return (
    <div className='flex flex-col items-center justify-center'>
        <MediaBanner 
            bannerImage={MediaBannnerIMG.src}
            description={pageData.description}
            title={pageData.title}
        />

    </div>
  )
}

export default page