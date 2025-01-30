import React from 'react'
import aboutBannerImage from '@/public/about-banner.jpg'
import { AboutBanner } from '../_component/AboutBanner'

const page = () => {
  return (
    <div className=' flex flex-col items-center justify-center'>
      <AboutBanner 
        bannerImage={aboutBannerImage.src}
        title='Climate Smart Tect'
        description='Climatesmart Technologies'
      />

      <div className=" py-20 ">
        <div className=" text-2xl"> {'Coming Soon...'} </div>
      </div>
      
    </div>
  )
}

export default page