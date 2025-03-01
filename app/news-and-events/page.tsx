import React from 'react'
import { NewsAndEventBanner } from './_components/NewsAndEventsBanner'
import NewsAndEventImage from '@/public/news-and-events.jpg'
import { getAllArticles } from '@/sanity/lib/quesries/articleQueries'
import { SanityTypes } from '@/@types'
import { ArticlesList } from './_components/ArticlesList'



const pageData = {
    title: "News and Events",
    description:
      "We currently have no news or events",
    href: "/news-and-events",
  }



  


const page = async () => {


  const articles = await getAllArticles() as SanityTypes.Article[]


  return (
    <div className=' flex flex-col items-center justify-center'>
      <NewsAndEventBanner 
      bannerImage={NewsAndEventImage.src}
      description={pageData.description}
      title={pageData.title}  
      />

      <div className=" py-20">


        {
          articles.length < 1 ? 
          <div className=" text-2xl"> {'No news or Event Available'} </div>
          : 
           <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Articles</h1>
            <ArticlesList articles={articles} />
          </div>
        }

      </div>

    </div>
  )
}

export default page