import React from 'react'
import { TrainingBanner } from './_components/TrainingBanner'
import bannerImmage from '@/public/research-and-development.jpg'

const page = () => {
  return (
    <div className=' flex flex-col '>
        <TrainingBanner 
        bannerImage={bannerImmage.src}
        description={'The Agribusiness Proficiency Course is a 3-month intensive training program designed to equip participants with the necessary skills and knowledge to start and run a successful agribusiness.'}
        title={'Agribusiness Proficiency Course'}
        />
    </div>
  )
}

export default page