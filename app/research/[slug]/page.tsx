import React from 'react'
import { ResearchBanner } from '../_components/ReasearchBanner'
import researchImage from '@/public/research-banner.jpg'

const page = async ({
    params
}: {params: { slug: string } }) => {

    const { slug } = await params
    const pageTitle = slug.replace(/-/g, ' ').replace(/^\w/, char => char.toUpperCase())

  return (
    <div>
        <ResearchBanner 
            title="Research" 
            bannerImage={researchImage.src}
            description={pageTitle} /> 

        <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              
            </div>
        </div>
    </div>
  )
}

export default page