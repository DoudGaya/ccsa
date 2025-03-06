import React from 'react'
// import { PublicationsBannner } from '../_components/PublicationsBannner'
import { MediaBanner } from '../_componentss/MediaBanner'
import pubBanner from '@/public/publication-banner.jpg'
// import { getAllPublicationByType, getPublicationByType } from '@/sanity/lib/queries'
import { getAllPublicationByType, getPublicationByType } from '@/sanity/lib/quesries/publicationQueries'
import { SanityTypes } from '@/@types'
import MediaShowcase from '../_componentss/MediaShowcase'
import MediaContents from '../_componentss/MediaContents'
import { getAllMedia, getAllMediaByType, getMediaTypeBySlug } from '@/sanity/lib/quesries/mediaQueries'
import { notFound } from 'next/navigation'
// import PublicationContents from '../_components/PublicationContents'
import MediaList from '../_componentss/MediaList'
import ActivityGrid from '@/app/activities/_components/ActivityGrid'
import { getAllActivities } from '@/sanity/lib/quesries/activitiesQueries'

type Params = {
  mediaSlug: string
}
const page = async (
 { params }: { params: Promise<Params> }
) => {
  const { mediaSlug } = await params

  // const allMedia = await getAllMedia() as SanityTypes.Media[]


const allMedia = await getAllMediaByType(mediaSlug) as SanityTypes.Media[]
const mediaType = await getMediaTypeBySlug(mediaSlug) as SanityTypes.MediaType

const activities = await getAllActivities() as SanityTypes.Activity[]

const allTypes = await getAllMedia() as SanityTypes.MediaType[]

  if (!mediaType) {
    return notFound()
  }


  if (mediaType.slug == 'activities') {
    return (
      <div className=' flex flex-col'>
        <MediaBanner 
        bannerImage={pubBanner.src}
        title={`${mediaType.title}`}
        description={mediaType.description} 
        />
        {
          allMedia.length > 0 ? <ActivityGrid activities={activities} />
          : <div className=" flex flex-col items-center justify-center py-20 space-y-3">
              <div className="">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-16">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636" />
              </svg>
              </div>
            <h1 className='text-2xl text-center'>No Media on { mediaType.title }</h1> 
          </div>
        }
      </div>
    )
   }

  return (

    <div className=' flex flex-col'>
        <MediaBanner 
        bannerImage={pubBanner.src}
        title={`${mediaType.title}`}
        description={mediaType.description} 
        />
         { allMedia.length > 0 ?  <MediaList mediaItems={allMedia} />
        : 
        allMedia.length === 0 && (
          <div className=" flex flex-col items-center justify-center py-20 space-y-3">
              <div className="">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-16">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636" />
              </svg>
              </div>
            <h1 className='text-2xl text-center'>No Media on { mediaType.title }</h1> 
          </div>
         )
        }
    </div>
  )
}

export default page