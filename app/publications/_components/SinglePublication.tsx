import { SanityTypes } from '@/@types'
import React from 'react'

const SinglePublication = ( {publication}: {publication: SanityTypes.Publication} ) => {
  return (
    <div className='bg-white dark:bg-black shadow-md rounded-lg p-6'>
        <h2 className='text-xl font-blog font-bold'>{publication.title}</h2>
        <p className=' font-poppins'>{publication.description}</p>
    </div>
  )
}

export default SinglePublication