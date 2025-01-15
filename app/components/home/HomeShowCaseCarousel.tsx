'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'


import image1 from '@/public/third.jpg'
import image2 from '@/public/research-and-development.jpg'
// import image3 from '@/public/second-carousel-3.jpg'
import image4 from '@/public/policy.jpg'
import Image, { StaticImageData } from 'next/image'

interface Product {
  id: number
  title: string
  description: string
  gradient: string
  image: StaticImageData
}

const products: Product[] = [
  {
    id: 1,
    title: "Digital Transformation",
    description: "Leveraging AI, IoT, and satellite tech for precision farming.",
    gradient: "from-green-500 via-emerald-500 to-tilt-500",
    image: image1
  },
  {
    id: 2,
    title: "Research & Development",
    description: "Developing climate-resilient crops and irrigation systems.",
    gradient: "from-blue-500 via-teal-500 to-green-500",
    image: image2
  },
  {
    id: 3,
    title: "Farmer Support",
    description: " Incubation programs, mentorship, and funding opportunities.",
    gradient: "from-orange-500 via-amber-500 to-yellow-500",
    image: image1
  },
  {
    id: 4,
    title: "Policy Advocacy",
    description: "Shaping policies that promote climate-smart agriculture.",
    gradient: "from-cyan-500 via-blue-500 to-indigo-500",
    image: image4
  }
]

export default function HomeShowCaseCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const nextSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true)
      setCurrentIndex((prev) => (prev + 1) % products.length)
    }
  }

  const prevSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true)
      setCurrentIndex((prev) => (prev - 1 + products.length) % products.length)
    }
  }

  useEffect(() => {
    timeoutRef.current = setInterval(nextSlide, 5000)
    return () => {
      if (timeoutRef.current) {
        clearInterval(timeoutRef.current)
      }
    }
  }, [])

  return (
    <section className="py-20 bg-white dark:bg-black">
      <div className="container mx-auto px-4">
      <div className=' flex flex-col text-center py-10 gap-4'>
                <h2 className='text-4xl text-brand dark:text-green-500 font-bold'>Mission</h2>
                <p className='text-lg max-w-4xl mx-auto text-center text-gray-600 dark:text-gray-400'>
                To drive the transformation of agriculture in Sub-Saharan Africa by advancing
                climate-smart practices through cutting-edge research, innovative education,
                and collaborative partnerships, fostering resilience, enhancing capacity, and
                ensuring sustainability in agricultural systems to mitigate the impacts of climate
                change and promote food security, livelihoods, and environmental
                conservation.
                </p>
            </div>
        <div className="relative">
          <div className="overflow-hidden">
            <div className="relative h-[600px] w-full">
              <AnimatePresence initial={false} mode="wait" onExitComplete={() => setIsAnimating(false)}>
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <ProductCard product={products[currentIndex]} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 md:-ml-20 border border-green-500 -translate-y-1/2 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Previous product"
          >
            <ChevronLeft className="w-6 stroke-green-500 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 md:-mr-20 border border-green-500 -translate-y-1/2 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Next product"
          >
            <ChevronRight className="w-6 stroke-green-500 h-6" />
          </button>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-2 mt-8">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  currentIndex === index
                    ? "bg-white w-6"
                    : "bg-white/50 hover:bg-white/75"
                )}
                aria-label={`Go to product ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="h-full w-full rounded-2xl overflow-hidden relative group">
      <div className={`absolute inset-0 bg-gradient-to-br ${product.gradient} opacity-90`} />
      <div className="relative h-full w-full p-8 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="w-full md:w-1/2 space-y-6">
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-white"
          >
            {product.title}
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-white/90"
          >
            {product.description}
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="px-6 py-3 bg-white text-black rounded-lg font-medium hover:bg-white/90 transition-colors"
          >
            Learn More
          </motion.button>
        </div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full md:w-1/2 aspect-square relative"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl" />
          <Image
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover rounded-xl"
          />
        </motion.div>
      </div>
    </div>
  )
}

