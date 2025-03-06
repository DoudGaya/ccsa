import React from 'react'
// import { NewsAndEventBanner } from './_components/NewsAndEventsBanner'
import { ActivitiesBanner } from './_components/ActivitiesBanner'
import NewsAndEventImage from '@/public/news-and-events.jpg'
// import { getAllActivities } from '@/sanity/lib/queries'
import { getAllActivities } from '@/sanity/lib/quesries/activitiesQueries'
import { SanityTypes } from '@/@types'
import ActivityGrid from './_components/ActivityGrid'



const pageData = {
    title: "Activities and Events",
    description:
      "We share our activities and events here",
    href: "/activities",
  }

  type Params = {
        slug: string
  }

const page = async () => {


    const activities = await getAllActivities() as SanityTypes.Activity[]


  return (
    <div className=' flex flex-col items-center justify-center'>
      <ActivitiesBanner 
      bannerImage={NewsAndEventImage.src}
      description={pageData.description}
      title={pageData.title}  
      />
      <div className=" py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* { activities.length < 1 ?
        <div className=" text-2xl"> {'No news or Event Available'} </div>
        : <ActivityGrid activities={activities} />
        } */}
      </div>
    </div>
  )
}

export default page