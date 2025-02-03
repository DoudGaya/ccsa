import React from 'react'
import { PublicationsBannner } from '../_components/PublicationsBannner'
import pubBanner from '@/public/publication-banner.jpg'
// import { getAllPublicationByType, getPublicationByType } from '@/sanity/lib/queries'
import { getAllPublicationByType, getPublicationByType } from '@/sanity/lib/quesries/publicationQueries'
import { SanityTypes } from '@/@types'
import PublicationContents from '../_components/PublicationContents'

type Params = {
  publicationSlug: string
}
const page = async (
 { params }: { params: Promise<Params> }
) => {
  const { publicationSlug } = await params

  const pubType = await getPublicationByType(publicationSlug) as SanityTypes.PublicationType;

  const allPublicationByType = await getAllPublicationByType(publicationSlug) as SanityTypes.Publication[]




  return (

    <div className=' flex flex-col'>
        <PublicationsBannner 
        bannerImage={pubBanner.src}
        title={`${pubType.title}`}
        description={pubType.description} 
        />
         { allPublicationByType.length > 0 ? <PublicationContents allPublicationsByType={allPublicationByType} /> 
        : 
         allPublicationByType.length === 0 && (
          <div className=" flex flex-col items-center justify-center py-20 space-y-3">
              <div className="">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-16">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636" />
              </svg>

              </div>
            <h1 className='text-2xl text-center'>No publications on { pubType.title }</h1> 
          </div>
         )
        }
         
    </div>
  )
}

export default page