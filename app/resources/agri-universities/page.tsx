import React from 'react'
import { MediaBanner } from '../_componentss/MediaBanner'
import pubBanner from '@/public/publication-banner.jpg'
import EducationalInstitutions from '@/app/components/EducationalInstitution'

const page = () => {
  return (
    <div>
    <MediaBanner 
        bannerImage={pubBanner.src}
        title={`Agri-Instutions`}
        description={`List of Nigerian Instutions offering Agriculture`} 
        />
        <EducationalInstitutions />
    </div>
  )
}

export default page