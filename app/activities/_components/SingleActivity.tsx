import { SanityTypes } from '@/@types'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import imageHolder from '@/public/placeholder-img.png'

const SingleActivity = ( {activity}: {activity: SanityTypes.Activity } ) => {
  return (
    <div className=' flex flex-col items-center justify-center'>
        <Link href={`/activities/${activity.slug}`} key={activity._id} className="group">
          <div className="bg-white text-brand rounded-lg shadow-md overflow-hidden transition-transform duration-300 ease-in-out group-hover:scale-105">
            <div className="relative h-[300px]">
              <Image
                src={activity.imageUrl || imageHolder.src}
                alt={activity.title}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="px-4 py-6">
              <h3 className="text-lg font-semibold mb-2  line-clamp-2">{activity.title}</h3>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span className=' line-clamp-1 '>{activity.location}</span>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {activity.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="bg-brand/30 text-gray-950 font-semibold px-2 py-0.5 rounded-full text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Link>
    </div>
  )
}

export default SingleActivity