import React from 'react'
import { AboutBanner } from '../_component/AboutBanner'
import AboutBannerImage from '@/public/about-banner.jpg'


const page = () => {
  return (
    <div>
    <AboutBanner 
        title="Advisory Board" 
        description=''                                
        bannerImage={AboutBannerImage.src} />
    </div>
  )
}

export default page