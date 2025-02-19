import React from 'react'
import aboutBannerImage from '@/public/about-banner.jpg'
import { ArrowRight, Leaf, Users, BookOpen, Zap, Globe } from 'lucide-react'
import AboutGrid from '../_component/AboutGrid'
import { AboutBanner } from '../_component/AboutBanner'
import Link from 'next/link'
// import { AboutBanner } from '../about/_component/AboutBanner'
// import AboutGrid from '../about/_component/AboutGrid'

const page = () => {
  return (
    <div className=' flex flex-col items-center justify-center'>
      <AboutBanner 
        bannerImage={aboutBannerImage.src}
        title='Climate Smart Tect'
        description='Climatesmart Technologies'
      />


        <section className=' w-full max-w-6xl text-black dark:text-white py-20 mx-auto flex flex-col items-center'>
          <h2 className=' text-3xl font-blog py-6'>
            Our Objectives 
          </h2>
            <AboutGrid  /> 

            <Link href='/about/about'>
          <p className='bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded mt-4'>
            Learn More <ArrowRight className='inline h-4 w-4' />
          </p>
            </Link>
        </section>
    </div>
  )
}

export default page