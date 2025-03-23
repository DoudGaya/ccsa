import React from 'react'
import aboutBannerImage from '@/public/about-banner.jpg'
import { AboutBanner } from '../_component/AboutBanner'
import PublicBanners from '@/app/components/PublicBanners'

const page = () => {
  return (
    <div className=' flex flex-col items-center justify-center'>
      <PublicBanners title='Climate Smart Technologies' message='Driving Innovation in Climate-Smart Agriculture' />
      <div className=" py-20 ">
        <div className=" text-2xl"> {'Coming Soon...'} </div>
      </div>
      
    </div>
  )
}

export default page