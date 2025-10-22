"use client"

import type { SanityTypes } from "@/@types"
import SocialShare from "@/app/components/SocialShare"
// import SocialShare from "@/components/SocialShare"
import EnhancedCommentsSection from "@/app/components/EnhancedCommentsSection"
import { PortableText } from "next-sanity"
import { formatDate } from "@/lib/utils"
import Image from "next/image"
// import EnhancedCommentsSection from "@/components/EnhancedCommentsSection"

interface ArticleContentsProps {
  article: SanityTypes.Article
}

export default function ArticleContents({ article }: ArticleContentsProps) {
  return (
    <div className="container mx-auto px-4 max-w-4xl">
      {/* Article Content */}
      <article className="prose prose-lg dark:prose-invert max-w-none mb-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
          {article.overview && <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">{article.overview}</p>}
          <div className="">
            <Image src={article.imageUrl || "/placeholder.svg"} alt={article.title} width={800} height={450} className="rounded-lg mb-2" />
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-8">
            {article.author?.name && <span>By {article.author.name}</span>}
            {/* {formatDate(article.dateCreated)} */}
            {article.dateCreated && <span>{formatDate(article.dateCreated)}</span>}
            {/* {article.dateCreated && <span>{new Date(article.dateCreated).toLocaleDateString()}</span>} */}
            {article.type?.name && (
              <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                {article.type.name}
              </span>
            )}
          </div>
        </div>

        {/* Article body content would go here */}
        <div className="mb-12">
           <article className=" prose lg:prose-lg dark:prose-invert  text-lg space-y-6">
                <PortableText 
                // @ts-ignore
                value={article.body} />
            </article>
        </div>
      </article>

      {/* Social Share */}
      <div className="mb-12">
        <SocialShare title={article.title} url={`/articles/${article.slug}`} description={article.overview} />
      </div>

      {/* Enhanced Comments Section with Real-time Updates and View Tracking */}
      <EnhancedCommentsSection articleSlug={article.slug} />
    </div>
  )
}


// // import { SanityTypes } from '@/@types'
// // import Image from 'next/image'
// // import React from 'react'
// // import Link from 'next/link'
// // import { PortableText } from 'next-sanity'
// // // import Link from 'next/link'
// // // import Link from 'next/link'

// // const ArticleContents = ( {
// //     article
// // }: {
// //     article: SanityTypes.Article
// // }) => {
// //   return (
// //     <div className='flex flex-col max-w-6xl w-full space-y-6 mx-auto px-8'>
// //        <Link href={`/staffs/${article.author.slug}`} className="flex space-x-3 cursor-pointer hover:bg-gray-200 max-w-max px-3 py-1 rounded-xl items-center  ">
// //         {
// //             article.author.imageUrl && (
// //                 <Image src={article.author.imageUrl} alt={article.title} className=' rounded-full h-[50px] w-[50px] object-cover' width={300} height={300} />
// //             )
// //         }
// //         <div className="  flex flex-col text-start items-start">
// //             <p className=' text-xs font-poppins'> {article.author.designation}</p>
// //             <p className=' font-main '> {article.author.name}</p>
// //             {/* <p> {article.author.name}</p> */}

// //         </div>
// //        </Link>

      



// //     </div>
// //   )
// // }

// // export default ArticleContents

// "use client"

// import type { SanityTypes } from "@/@types"
// // import SocialShare from "@/components/SocialShare"
// // import CommentsSection from "@/components/CommentsSection"
// import CommentsSection from "@/app/components/CommentsSection"
// import SocialShare from "@/app/components/SocialShare"
// import { PortableText } from "next-sanity"
// interface ArticleContentsProps {
//   article: SanityTypes.Article
// }

// export default function ArticleContents({ article }: ArticleContentsProps) {
//   return (
//     <div className="container mx-auto px-4 max-w-4xl">
       
//       <article className="prose prose-lg dark:prose-invert max-w-none mb-12">
//         <div className="mb-8">
//           <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
//           {article.overview && <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">{article.overview}</p>}
//           <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-8">
//             {article.author?.name && <span>By {article.author.name}</span>}
//             {article._createdAt && <span>{new Date(article._createdAt).toLocaleDateString()}</span>}
//             {article.type?.name && (
//               <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
//                 {article.type.name}
//               </span>
//             )}
//           </div>
//         </div>

//         {/* Article body content would go here */}
        // <div className="mb-12">
         
//       {/* Social Share */}
//       <div className="mb-12">
//         <SocialShare title={article.title} url={`/articles/${article.slug}`} description={article.overview} />
//       </div>

//       {/* Comments Section */}
//       <CommentsSection articleSlug={article.slug} />
//     </div>
//   )
// }
