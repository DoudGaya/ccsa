import React from 'react'
import aboutBannerImage from '@/public/about-banner.jpg'
import { AboutBanner } from '../../_component/AboutBanner'
import { PortableText } from 'next-sanity'
import { getWorkEthics } from '@/sanity/lib/quesries/ethicsQueries'
import { SanityTypes } from '@/@types'
import ArticleContents from '@/app/articles/[slug]/_components/ArticleContents'

type Params = {
        ethics: string
}

const page = async ( {params}: { params:  Promise<Params> }) => {

    const { ethics } = await params

    // console.log(ethics)
  const ethicsType  = await getWorkEthics(ethics) as SanityTypes.Ethics;



  return (
    <div className=' flex flex-col items-center justify-center'>
      <AboutBanner 
        bannerImage={aboutBannerImage.src}
        title='Work Ethics'
        description='Learn about our work ethics in Centre for Climate-Smart Agriculture (Cosmopolitan University Abuja)'
      />
       <div className=" flex items-start px-6 w-full max-w-7xl">
       <article className=" prose py-10 font-main lg:prose-lg dark:prose-invert text-lg space-y-6">
              <PortableText 
                value={ethicsType.body as any} />
             </article>
       </div>
    </div>
  )
}

export default page