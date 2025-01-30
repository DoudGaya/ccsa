import React from 'react'
import { MediaBanner } from '../_componentss/MediaBanner'
import MediaBannnerIMG from '@/public/media-banner.jpg'


const pageData = {
    title: "Documentaries",
    description:
      "Watch our documentaries on various topics related to mental Climate and Smart Agriculture.",
    href: "/media/documentaries",
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