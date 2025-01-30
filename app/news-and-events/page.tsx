import React from 'react'
import { NewsAndEventBanner } from './_components/NewsAndEventsBanner'
import NewsAndEventImage from '@/public/news-and-events.jpg'



const pageData = {
    title: "News and Events",
    description:
      "We currently have no news or events",
    href: "/news-and-events",
  }


const page = () => {
  return (
    <div className=' flex flex-col items-center justify-center'>
      <NewsAndEventBanner 
      bannerImage={NewsAndEventImage.src}
      description={pageData.description}
      title={pageData.title}  
      />

      <div className=" py-20">

        <div className=" text-2xl"> {'No news or Event Available'} </div>

      </div>

    </div>
  )
}

export default page