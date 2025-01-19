import { SanityTypes } from '@/@types'
import { DynamicBanner } from '@/app/components/dynamics/DynamicBanner'
import { getSingleArticle } from '@/sanity/lib/queries'
import { notFound } from 'next/navigation'
import React from 'react'

const Page = async ({ params }: {
  params: {
    slug: string
  }
}) => {
  const { slug } = await params  

  // if (!slug) {
  //   notFound()
  // }

  try {
    const article = await getSingleArticle(slug) as SanityTypes.Article
    
  

    return (
      <div className='flex flex-col w-full'>
        <DynamicBanner 
          title={article.title} 
          bannerImage={article.imageUrl} 
          description={article.overview} 
        />
      </div>
    )
  } catch (error) {
    console.error('Error fetching article:', error)
    throw error // Let Next.js error boundary handle this
  }
}

export default Page  // Capitalize component name per React conventions