import { SanityTypes } from '@/@types'
import React from 'react'

const SingleMedia = ( {media}: {media: SanityTypes.Media} ) => {
  return (
    <div className='bg-white dark:bg-black shadow-md rounded-lg p-6'>
        <h2 className='text-xl font-main font-bold'>{media.title}</h2>
        <p className=' font-poppins'>{media.description}</p>
    </div>
  )
}

export default SingleMedia