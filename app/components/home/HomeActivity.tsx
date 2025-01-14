'use client'

import { motion, useAnimationControls } from 'framer-motion'
import { useEffect } from 'react'
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"


interface Activity  {
  title: string
  description: string
  heroImage: string
  location: string
  badge: string
  slug?: string
  date: string
  images?: string[]
}

const activities: Activity[] = [
  {
    title: 'Agriculrural Development Workshop',
    description: 'Agriculrural Development Workshop is a workshop that is aimed at training farmers on the best practices in agriculture',
    heroImage: '/assets/img/agriculture.jpg',
    location: 'Abuja, Nigeria',
    date: '12th October, 2021',
    badge: 'New',
    images: [
      '/assets/img/agriculture.jpg',
      '/assets/img/agriculture.jpg',
      '/assets/img/agriculture.jpg',
      '/assets/img/agriculture.jpg',
    ]
  },
  {
    title: 'Agriculrural Development Workshop',
    description: 'Agriculrural Development Workshop is a workshop that is aimed at training farmers on the best practices in agriculture',
    heroImage: '/assets/img/agriculture.jpg',
    location: 'Abuja, Nigeria',
    date: '12th October, 2021',
    badge: 'Event',
    images: [
      '/assets/img/agriculture.jpg',
      '/assets/img/agriculture.jpg',
      '/assets/img/agriculture.jpg',
      '/assets/img/agriculture.jpg',
    ]
  },
  {
    title: 'Agriculrural Development Workshop',
    description: 'Agriculrural Development Workshop is a workshop that is aimed at training farmers on the best practices in agriculture',
    heroImage: '/assets/img/agriculture.jpg',
    location: 'Abuja, Nigeria',
    date: '12th October, 2021',
    badge: 'Update',
    images: [
      '/assets/img/agriculture.jpg',
      '/assets/img/agriculture.jpg',
      '/assets/img/agriculture.jpg',
      '/assets/img/agriculture.jpg',
    ]
  },
  {
    title: 'Agriculrural Development Workshop',
    description: 'Agriculrural Development Workshop is a workshop that is aimed at training farmers on the best practices in agriculture',
    heroImage: '/assets/img/agriculture.jpg',
    location: 'Abuja, Nigeria',
    date: '12th October, 2021',
    badge: 'Announcement',
    images: [
      '/assets/img/agriculture.jpg',
      '/assets/img/agriculture.jpg',
      '/assets/img/agriculture.jpg',
      '/assets/img/agriculture.jpg',
    ]
  }

]

export default function HomeActivity() {
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
    <section className=" bg-white text-brand py-20">
      <div className="container mx-auto px-4 mb-12">
        <h2 className="text-3xl md:text-4xl text-gray-400 font-bold text-center mb-4">
          Event and Activties
        </h2>
      </div>

      <div className="relative w-full overflow-hidden bg-gradient-to-r ">
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-10" />

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
                {activities.map((event, index) => (
                  <Link
                    key={`${setIndex}-${index}`}
                    href={event.slug || '#'}
                    className="flex items-center flex-col cursor-pointer group group-hover:bg-gray-200 rounded-lg py-6 space-y-3 px-4 justify-center w-[300px] h-[400px]"
                  >
                  <div className=" overflow-hidden bg-[#202020] h-full w-full rounded-lg">
                  <Image
                      src={event.heroImage}
                      alt={event.title}
                      width={120}
                      height={40}
                      className="opacity-70 group-hover:opacity-100 h-full w-full object-cover transition-opacity group-hover:grayscale-0"
                    />
                  </div>
                  <div className=" flex flex-col px-1 group-hover:opacity-100 items-start w-full">
                    <p className={
                      `text-xs px-4 py-0.5 rounded-xl 
                      ${event.badge === 'Event' ? 'bg-green-500' :
                        event.badge === 'Announcement' ? 'bg-yellow-500' :
                        event.badge === 'Update' ? ' bg-purple-500' : ' bg-red-500'} `}
                      >{ event.badge.toUpperCase()}</p>
                    <p className='text-xs'>{ event.date }</p>
                    <h3 className=' text-lg'>{ event.title }</h3>
                    <p className=' line-clamp-2'>{ event.description }</p>
                  </div>
                  </Link>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="flex justify-center mt-12">
        <Button asChild variant="outline" size="lg">
          <Link href="/partners">
             Activities
          </Link>
        </Button>
      </div>
    </section>
  )
}

