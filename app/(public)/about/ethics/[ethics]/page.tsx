import React from 'react'
import aboutBannerImage from '@/public/about-banner.jpg'
import { AboutBanner } from '../../_component/AboutBanner'
import { PortableText } from 'next-sanity'
import { getWorkEthics } from '@/sanity/lib/quesries/ethicsQueries'
import { SanityTypes } from '@/@types'
import ArticleContents from '@/app/(public)/articles/[slug]/_components/ArticleContents'
import PublicBanners from '@/app/components/PublicBanners'

type Params = {
        ethics: string
}

const page = async ( {params}: { params:  Promise<Params> }) => {

    const { ethics } = await params

    // console.log(ethics)
  const ethicsType  = await getWorkEthics(ethics) as SanityTypes.Ethics;


  const pageTitle = ethicsType.title


  return (
    <div className=' flex flex-col items-center justify-center'>

      <PublicBanners 
        title={pageTitle}
        message={ethicsType.description}
      />
      {/* <AboutBanner 
        bannerImage={aboutBannerImage.src}
       
      /> */}
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