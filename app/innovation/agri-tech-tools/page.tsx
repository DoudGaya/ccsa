import React from 'react'
import { InnovationBanner } from '../_components/InnovationBanner'
import innovationBannerImmage from '@/public/innovation-banner.jpg'


const pageData = {
    title: "Agri-Tech Tools",
    description:
      "We are developing and leveraging Agri-Tech Tools to improve farming practices",
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