"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useAnimationControls } from "framer-motion"
import { Calendar, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { SanityTypes } from "@/@types"

export default function HomeNews({
  articles,
}: {
  articles: SanityTypes.Article[]
}) {
  const controls = useAnimationControls()
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!articles?.length) return

    // Calculate total width for smoother animation
    const totalWidth = containerRef.current?.scrollWidth || 0
    const viewportWidth = containerRef.current?.offsetWidth || 0
    const scrollDistance = totalWidth - viewportWidth

    controls.start({
      x: [-10, -scrollDistance],
      transition: {
        duration: scrollDistance / 50, // Speed adjustment based on content width
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "loop",
        ease: "linear",
      },
    })
  }, [controls, articles])

  const handleHover = () => {
    controls.stop()
  }

  const handleHoverEnd = () => {
    if (!articles?.length) return

    const totalWidth = containerRef.current?.scrollWidth || 0
    const viewportWidth = containerRef.current?.offsetWidth || 0
    const scrollDistance = totalWidth - viewportWidth

    controls.start({
      x: [-10, -scrollDistance],
      transition: {
        duration: scrollDistance / 50,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "loop",
        ease: "linear",
      },
    })
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  return (
    <section className="py-24 bg-gradient-to-b from-white to-slate-50 dark:from-gray-950 dark:to-black">
      <div className="container mx-auto px-4 mb-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-500 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
            Latest News & Updates
          </h2>
          <Button
            asChild
            variant="outline"
            className="group border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Link href="/activities" className="flex items-center gap-2">
              Browse all articles
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="relative w-full overflow-hidden">
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-white dark:from-gray-950 to-transparent z-10" />
        <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-white dark:from-gray-950 to-transparent z-10" />

        {/* Scrolling Content */}
        <div ref={containerRef} className="py-8" onMouseEnter={handleHover} onMouseLeave={handleHoverEnd}>
          <motion.div animate={controls} initial={{ x: 0 }} className="flex gap-6">
            {/* First Set of Articles */}
            {[...Array(2)].map((_, setIndex) => (
              <div key={setIndex} className="flex space-x-6">
                {articles.map((article, index) => (
                  <ArticleCard key={`${setIndex}-${index}`} article={article} />
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function ArticleCard({ article }: { article: SanityTypes.Article }) {
  // Determine badge color based on article type
  const getBadgeVariant = (typeSlug: string) => {
    switch (typeSlug) {
      case "post":
        return "success"
      case "research":
        return "secondary"
      case "update":
        return "purple"
      default:
        return "outline"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  return (
    <Card className="w-[380px] shadow-lg hover:shadow-xl dark:shadow-gray-900/20 transition-all duration-300 group overflow-hidden">
      <Link href={`/articles/${article.slug}`} className="block h-full">
        <div className="relative h-52 overflow-hidden">
          <Image
            src={article.imageUrl || "/placeholder.svg"}
            alt={article.title}
            fill
            className="object-cover transition-all duration-500 filter group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
          <Badge variant={getBadgeVariant(article.type.slug) as any} className="absolute top-3 left-3 z-10 px-3 py-1">
            {article.type.name}
          </Badge>
        </div>

        <CardContent className="pt-5 pb-2">
          <h3 className="text-lg font-semibold line-clamp-2 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
            {article.title}
          </h3>

          {article.overview && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 line-clamp-2">{article.overview}</p>
          )}
        </CardContent>

        <CardFooter className="flex justify-between pt-0 text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>{formatDate(article._createdAt)}</span>
          </div>
          <span className="font-medium">{article.author?.name?.split(" ")[0] || "Anonymous"}</span>
        </CardFooter>
      </Link>
    </Card>
  )
}


// 'use client'

// import { motion, useAnimationControls } from 'framer-motion'
// import { useEffect } from 'react'
// import Image, { StaticImageData } from 'next/image'
// import Link from 'next/link'
// import { Button } from "@/components/ui/button"
// import { SanityTypes } from '@/@types'
// // import { homeActivities } from '@/lib/utils'


// export default function HomeNews( {
//   articles
// }: {
//   articles: SanityTypes.Article[]
// }) {
//   const controls = useAnimationControls()

//   useEffect(() => {
//     controls.start({
//       x: [0, -1035],
//       transition: {
//         duration: 20,
//         repeat: Infinity,
//         ease: "linear",
//       }
//     })
//   }, [controls])

//   const handleHover = () => {
//     controls.stop()
//   }

//   const handleHoverEnd = () => {
//     controls.start({
//       x: [0, -1035],
//       transition: {
//         duration: 20,
//         repeat: Infinity,
//         ease: "linear",
//       }
//     })
//   }

//   return (
//     <section className=" bg-white dark:bg-black text-brand dark:text-blue-200 py-20">
//       <div className="container mx-auto px-4 mb-12">
//         <h2 className="text-3xl md:text-4xl text-gray-400 font-bold text-center mb-4">
//           News and Posts
//         </h2>
//       </div>

//       <div className="relative w-full overflow-hidden bg-gradient-to-r ">
//         {/* Gradient Overlays */}
//         <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-white dark:from-stone-900 to-transparent z-10" />
//         <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-white dark:from-stone-900 to-transparent z-10" />

//         {/* Scrolling Content */}
//         <div 
//           className="flex overflow-hidden py-8"
//           onMouseEnter={handleHover}
//           onMouseLeave={handleHoverEnd}
//         >
//           <motion.div
//             animate={controls}
//             initial={{
//               x: 0
//             }}
//             className="flex gap-16 mx-4"
//           >
//             {/* First Set of Logos */}
//             {[...Array(2)].map((_, setIndex) => (
//               <div key={setIndex} className="flex space-x-16 ">
//                 {articles.map((event, index) => (
//                   <Link
//                     key={`${setIndex}-${index}`}
//                     href={`/articles/${event.slug}`}
//                     className="flex items-center flex-col bg-gray-100 dark:bg-gray-900 cursor-pointer group group-hover:bg-gray-200 rounded-lg py-6 space-y-3 px-4 justify-center w-[500px] h-[400px]"
//                   >
//                   <div className=" overflow-hidden bg-[#202020] h-full w-full rounded-lg">
//                   <Image
//                       src={event.imageUrl}
//                       alt={event.title}
//                       width={600}
//                       height={600}
//                       className="opacity-70 group-hover:opacity-100 h-full w-full object-cover transition-opacity group-hover:grayscale-0"
//                     />
//                   </div>
//                   <div className=" flex flex-col space-y-2 px-1 group-hover:opacity-100 items-start w-full">
//                     <p className={
//                       `text-xs px-4 py-0.5 rounded-xl 
//                       ${event.type.slug === 'post' ? 'bg-green-400/40 dark:text-green-50 text-green-900' :
//                         event.type.slug === 'update' ? ' bg-purple-500' : ' bg-gray-900 dark:bg-gray-700 text-gray-400'} `}
//                       >{ event.type.name}</p>
//                     {/* <p className='text-xs'>{ event._createdAt }</p> */}
//                     <h3 className=' text-md w-full font-poppins'>{ event.title }</h3>
//                   </div>
//                   </Link>
//                 ))}
//               </div>
//             ))}
//           </motion.div>
//         </div>
//       </div>

//       <div className="flex justify-center mt-12">
//         <Button asChild variant="outline" className=' dark:text-blue-400 font-semibold font-poppins' size="lg">
//           <Link href="/activities">
//              More news 
//           </Link>
//         </Button>
//       </div>
//     </section>
//   )
// }

