'use client'

import { motion, useAnimationControls } from 'framer-motion'
import { useEffect } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { SanityTypes } from '@/@types'
import SingleActivity from '@/app/activities/_components/SingleActivity'

export default function HomeActivity( {
  activities
}: {
  activities: SanityTypes.Activity[]
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
    <section className=" bg-white dark:bg-black text-brand py-20">
      <div className="container mx-auto px-4 mb-12">
        <h2 className="text-3xl md:text-4xl text-gray-400 font-bold text-center mb-4">
          Event and Activties
        </h2>
      </div>

      <div className="relative w-full overflow-hidden bg-gradient-to-r ">
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-white dark:from-gray-900 to-transparent z-10" />
        <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-white dark:from-gray-900 to-transparent z-10" />

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
            {[...Array(1)].map((_, setIndex) => (
              <div key={setIndex} className="flex space-x-16 ">
                {activities.map((event, index) => (
                  <SingleActivity key={`${setIndex}-${index}`} activity={event} />
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
      <div className="flex justify-center mt-12">
        <Button asChild variant="outline" className=' dark:text-blue-400 font-semibold font-poppins' size="lg">
          <Link href="/activities">
             Activities
          </Link>
        </Button>
      </div>
    </section>
  )
}

