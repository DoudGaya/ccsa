import React from 'react'
import { NewsAndEventBanner } from './_components/NewsAndEventsBanner'
import NewsAndEventImage from '@/public/news-and-events.jpg'
import { getAllArticles } from '@/sanity/lib/quesries/articleQueries'
import { SanityTypes } from '@/@types'
import { ArticlesList } from './_components/ArticlesList'
import { EventList } from '@/components/home/event-list'
import { getAllEvents } from '@/sanity/lib/quesries/eventQueries'
import PublicBanners from '../../components/PublicBanners'



const pageData = {
    title: "News and Events",
    description:
      "Stay up to date with the latest news and events happening in the world of agriculture",
    href: "/news-and-events",
  }



  


const page = async () => {


  const articles = await getAllArticles() as SanityTypes.Article[]

  const events = await getAllEvents() as SanityTypes.Events[]


  // const events


  return (
    <div className=' flex flex-col items-center justify-center'>
      {/* <NewsAndEventBanner 
      bannerImage={NewsAndEventImage.src}
      description={pageData.description}
      title={pageData.title}  
      /> */}
      <PublicBanners message={pageData.description} title={pageData.title} />

      <div className=" py-20">
        {/* {
          articles.length < 1 ? 
          <div className=" text-2xl"> {'No news or Event Available'} </div>
          : 
           <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">News</h1>
            <ArticlesList articles={articles} />
          </div>
        } */}

      <div className=" max-w-7xl flex flex-col space-y-6 mx-auto px-4 py-8 w-full ">

        <div className=" text-6xl font-main font-bold ">Events</div>
      <EventList events={events} />
      </div>

      </div>

    </div>
  )
}

export default page