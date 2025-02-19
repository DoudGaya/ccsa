import React from 'react'
import { InnovationBanner } from '../_components/InnovationBanner'
import innovationBannerImmage from '@/public/innovation-banner.jpg'



const pageData = {
    title: "Farmer Incubation",
    description:
      "We are incubating farmers to improve their farming practices",
    href: "/media/farmer-incubation",
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