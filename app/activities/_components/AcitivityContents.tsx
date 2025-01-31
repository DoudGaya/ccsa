import { SanityTypes } from '@/@types'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import { PortableText } from 'next-sanity'

const ActivityContents = ( {
    article
}: {
    article: SanityTypes.Article
}) => {
  return (
    <div className='flex flex-col max-w-6xl w-full space-y-6 mx-auto px-8'>
       <Link href={`/staffs/${article.author.slug}`} className="flex space-x-3 cursor-pointer hover:bg-gray-200 max-w-max px-3 py-1 rounded-xl items-center  ">
        {
            article.author.imageUrl && (
                <Image src={article.author.imageUrl} alt={article.title} className=' rounded-full h-[50px] w-[50px] object-cover' width={300} height={300} />
            )
        }
        <div className="  flex flex-col text-start items-start">
            <p className=' text-xs font-poppins'> {article.author.designation}</p>
            <p className=' font-blog '> {article.author.name}</p>
            {/* <p> {article.author.name}</p> */}

        </div>
       </Link>

      


       <article className=" prose lg:prose-lg dark:prose-invert font-blog text-lg space-y-6">
        <PortableText 
        // @ts-ignore
        value={article.body} />
       </article>
    </div>
  )
}

export default ActivityContents