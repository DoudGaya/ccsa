import React from 'react'
import { InnovationBanner } from '../_components/InnovationBanner'


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
        bannerImage={pageData.title}
        description={pageData.description}
        title={pageData.description}

        />
    </div>
  )
}

export default page