import React from 'react'
import PublicBanners from '../../components/PublicBanners'
import { getAllArticles } from '@/sanity/lib/quesries/articleQueries'



const page = async () => {

  // const news = await getAllArticles() as News[] // Replace 'any' with the appropriate type if available

  return (
    <div>
        <PublicBanners title='News Page' message='to be done...' />   
    </div>
  )
}

export default page