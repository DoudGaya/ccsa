import { SanityTypes } from '@/@types'
import React from 'react'
import SinglePublication from './SinglePublication'

const PublicationContents = ({
  allPublicationsByType
}: {allPublicationsByType: SanityTypes.Publication[]}) => {

  console.log(allPublicationsByType)
  return (
    <div className=' py-20 max-w-7xl flex flex-col space-y-6 mx-auto w-full'>
         <div className=" py-3 w-full">
         <h1 className=' underline text-3xl font-blog max-w-max'> { allPublicationsByType[0].publicationType.title + 's'} </h1>
         </div>

          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {
              allPublicationsByType.map((publication) => <SinglePublication key={publication._id} publication={publication}  />)
            }
          </div>
    </div>
  )
}

export default PublicationContents