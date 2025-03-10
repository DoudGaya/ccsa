import React from 'react'
import aboutBannerImage from '@/public/about-banner.jpg'
import { AboutBanner } from '../_component/AboutBanner'
import { PortableText } from 'next-sanity'
import { getWorkEthics } from '@/sanity/lib/quesries/ethicsQueries'
import { SanityTypes } from '@/@types'



const page = async  () => {
  const ethics  = await getWorkEthics('work-ethics') as SanityTypes.Ethics;


  console.log(ethics)
  return (
    <div className=' flex flex-col items-center justify-center'>
      <AboutBanner 
        bannerImage={aboutBannerImage.src}
        title='Work Ethics'
        description='Learn about our work ethics in Centre for Climate-Smart Agriculture (Cosmopolitan University Abuja)'
      />
        <article className=" prose py-10 lg:prose-lg dark:prose-invert font-blog text-lg space-y-6">
              <PortableText 
             
              value={ethics.body as any} />
             </article>
    </div>
  )
}

export default page