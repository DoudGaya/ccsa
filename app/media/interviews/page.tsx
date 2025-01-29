import React from 'react'
import { MediaBanner } from '../_componentss/MediaBanner'


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
            bannerImage={pageData.title}
            description={pageData.description}
            title={pageData.title}
        />

    </div>
  )
}

export default page