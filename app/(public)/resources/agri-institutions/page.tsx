import React from 'react'
import { MediaBanner } from '../_componentss/MediaBanner'
import pubBanner from '@/public/publication-banner.jpg'
import EducationalInstitutions from '@/app/components/EducationalInstitution'
import PublicBanners from '@/app/components/PublicBanners'

const page = () => {
  return (
    <div>
        <PublicBanners title='Agri-Instutions' message='List of Nigerian Instutions offering Agriculture' />
        <EducationalInstitutions />
    </div>
  )
}

export default page