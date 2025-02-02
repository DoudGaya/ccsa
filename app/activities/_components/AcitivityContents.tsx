import { SanityTypes } from '@/@types'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import { PortableText } from 'next-sanity'

const ActivityContents = ( {
    activity
}: {
    activity: SanityTypes.Activity
}) => {
  return (
    <div className='flex flex-col max-w-6xl w-full space-y-6 mx-auto px-8'>
       <Link href={`/staffs/${activity.author.slug}`} className="flex space-x-3 cursor-pointer hover:bg-gray-200 max-w-max px-3 py-1 rounded-xl items-center  ">
        {
            activity.author.imageUrl && (
                <Image src={activity.author.imageUrl} alt={activity.title} className=' rounded-full h-[50px] w-[50px] object-cover' width={300} height={300} />
            )
        }
        <div className="  flex flex-col text-start items-start">
            <p className=' text-xs font-poppins'> {activity.author.designation}</p>
            <p className=' font-blog '> {activity.author.name}</p>
            {/* <p> {activity.author.name}</p> */}

        </div>
    </Link>

      


       <article className=" prose lg:prose-lg dark:prose-invert font-blog text-lg space-y-6">
        <PortableText 
        // @ts-ignore
        value={activity.body} />
       </article>
    </div>
  )
}

export default ActivityContents