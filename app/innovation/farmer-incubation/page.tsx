import React from 'react'
import { InnovationBanner } from '../_components/InnovationBanner'
import innovationBannerImmage from '@/public/innovation-banner.jpg'
import PublicBanners from '@/app/components/PublicBanners'
import { PortableText } from 'next-sanity'



const pageData = {
    title: "Farmer Incubator Programme for Climate-Smart Agriculture (FIP-CSA)",
    description:
      "The FIP-CSA aims to support 1,800 smallholder farmers in Nigeria over five years in adopting climate-smart agricultural (CSA) practices, improving their productivity, resilience, and livelihoods.",
    href: "/media/farmer-incubation",
  }

const page = () => {
  return (
    <div>
        <PublicBanners title={pageData.title} message={pageData.description} /> 
         <article className=" prose lg:prose-lg dark:prose-invert font-blog text-lg space-y-6">
                <PortableText 
                // @ts-ignore
                value={article.body} />
               </article>
    </div>
  )
}

export default page