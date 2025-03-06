import { SanityTypes } from '@/@types'
import React from 'react'
// import SinglePublication from './SingleMedia'
import SingleMedia from './SingleMedia'

const MediaContents = ({
  media
}: {media: SanityTypes.Media[]}) => {

  return (
    <div className=' py-20 max-w-7xl flex flex-col space-y-6 mx-auto w-full'>
         <div className=" py-3 w-full">
         <h1 className=' underline text-3xl font-blog max-w-max'> { media[0].mediaType.title + 's'} </h1>
         </div>

          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {
              media.map((m) => <SingleMedia key={m._id} media={m}  />)
            }
          </div>
    </div>
  )
}

export default MediaContents