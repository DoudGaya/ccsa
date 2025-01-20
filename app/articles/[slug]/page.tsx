import type { SanityTypes } from "@/@types"
import { DynamicBanner } from "@/app/components/dynamics/DynamicBanner"
import { getSingleArticle } from "@/sanity/lib/queries"
import type React from "react"
import ArticleContents from "./_components/ArticleContents"

interface PageProps {
  params: {
    slug: string
  }
}

const Page: React.FC<PageProps> = async ({ params }) => {
  const { slug } = params

  try {
    const article = (await getSingleArticle(slug)) as SanityTypes.Article
    return (
      <div className="flex flex-col w-full">
        <DynamicBanner title={article.title} bannerImage={article.imageUrl} description={article.overview} />
        <div className="py-6">
          <ArticleContents article={article} />
        </div>
      </div>
    )
  } catch (error) {
    console.error("Error fetching article:", error)
    throw error // Let Next.js error boundary handle this
  }
}

export default Page




// import { SanityTypes } from '@/@types'
// import { DynamicBanner } from '@/app/components/dynamics/DynamicBanner'
// import { getSingleArticle } from '@/sanity/lib/queries'
// import React from 'react'
// import ArticleContents from './_components/ArticleContents'

// const Page = async ({ params }: {
//   params: {
//     slug: string
//   }
// }) => {
//   const { slug } = params 

//   try {
//     // @ts-ignore
//     const article = await getSingleArticle(slug) as SanityTypes.Article
//     return (
//       <div className='flex flex-col w-full'>
//         <DynamicBanner 
//           title={article.title} 
//           bannerImage={article.imageUrl} 
//           description={article.overview} 
//         />
//        <div className=" py-6">
//           <ArticleContents article={article} />
//        </div>
//       </div>
//     )
//   } catch (error) {
//     console.error('Error fetching article:', error)
//     throw error // Let Next.js error boundary handle this
//   }
// }

// export default Page  // Capitalize component name per React conventions