'use client'

import { motion, useAnimationControls } from 'framer-motion'
import { useEffect } from 'react'
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { SanityTypes } from '@/@types'
// import { homeActivities } from '@/lib/utils'


export default function HomeNews( {
  articles
}: {
  articles: SanityTypes.Article[]
}) {
  const controls = useAnimationControls()

  useEffect(() => {
    controls.start({
      x: [0, -1035],
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: "linear",
      }
    })
  }, [controls])

  const handleHover = () => {
    controls.stop()
  }

  const handleHoverEnd = () => {
    controls.start({
      x: [0, -1035],
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: "linear",
      }
    })
  }

  return (
    <section className=" bg-white dark:bg-black text-brand dark:text-blue-200 py-20">
      <div className="container mx-auto px-4 mb-12">
        <h2 className="text-3xl md:text-4xl text-gray-400 font-bold text-center mb-4">
          News and Posts
        </h2>
      </div>

      <div className="relative w-full overflow-hidden bg-gradient-to-r ">
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-white dark:from-stone-900 to-transparent z-10" />
        <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-white dark:from-stone-900 to-transparent z-10" />

        {/* Scrolling Content */}
        <div 
          className="flex overflow-hidden py-8"
          onMouseEnter={handleHover}
          onMouseLeave={handleHoverEnd}
        >
          <motion.div
            animate={controls}
            initial={{
              x: 0
            }}
            className="flex gap-16 mx-4"
          >
            {/* First Set of Logos */}
            {[...Array(2)].map((_, setIndex) => (
              <div key={setIndex} className="flex space-x-16 ">
                {articles.map((event, index) => (
                  <Link
                    key={`${setIndex}-${index}`}
                    href={`/articles/${event.slug}`}
                    className="flex items-center flex-col bg-gray-100 dark:bg-gray-900 cursor-pointer group group-hover:bg-gray-200 rounded-lg py-6 space-y-3 px-4 justify-center w-[500px] h-[400px]"
                  >
                  <div className=" overflow-hidden bg-[#202020] h-full w-full rounded-lg">
                  <Image
                      src={event.imageUrl}
                      alt={event.title}
                      width={600}
                      height={600}
                      className="opacity-70 group-hover:opacity-100 h-full w-full object-cover transition-opacity group-hover:grayscale-0"
                    />
                  </div>
                  <div className=" flex flex-col space-y-2 px-1 group-hover:opacity-100 items-start w-full">
                    <p className={
                      `text-xs px-4 py-0.5 rounded-xl 
                      ${event.type.slug === 'post' ? 'bg-green-400/40 dark:text-green-50 text-green-900' :
                        event.type.slug === 'update' ? ' bg-purple-500' : ' bg-gray-900 dark:bg-gray-700 text-gray-400'} `}
                      >{ event.type.name}</p>
                    {/* <p className='text-xs'>{ event._createdAt }</p> */}
                    <h3 className=' text-md w-full font-poppins'>{ event.title }</h3>
                  </div>
                  </Link>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="flex justify-center mt-12">
        <Button asChild variant="outline" className=' dark:text-blue-400 font-semibold font-poppins' size="lg">
          <Link href="/activities">
             More news 
          </Link>
        </Button>
      </div>
    </section>
  )
}

