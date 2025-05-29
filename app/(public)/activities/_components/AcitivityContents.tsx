import { SanityTypes } from '@/@types'
import React from 'react'
import { PortableText } from 'next-sanity'

const ActivityContents = ( {
    activity
}: {
    activity: SanityTypes.Activity
}) => {
  return (
    <div className='flex flex-col max-w-6xl w-full space-y-6 mx-auto px-8'>
       <article className=" prose lg:prose-lg dark:prose-invert font-main text-lg space-y-6">
        <PortableText 
        // @ts-ignore
        value={activity.contents} />
       </article>
    </div>
  )
}

export default ActivityContents