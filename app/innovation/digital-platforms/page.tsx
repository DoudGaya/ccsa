import React from 'react'
import { InnovationBanner } from '../_components/InnovationBanner'
import innovationBannerImmage from '@/public/innovation-banner.jpg'


const pageData = {
    title: "Digital Platforms",
    description:
      "We have state-of-the-art Digital Platforms",
    href: "/media/interviews",
  }

const page = () => {
  return (
    <div>
        <InnovationBanner 
        bannerImage={innovationBannerImmage.src}
        description={pageData.description}
        title={pageData.title}
        />
    </div>
  )
}

export default page