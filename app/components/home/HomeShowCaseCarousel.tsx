'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Product {
  id: number
  title: string
  description: string
  gradient: string
  image: string
}

const products: Product[] = [
  {
    id: 1,
    title: "AI Assistant",
    description: "Your personal AI companion for everyday tasks and creative endeavors",
    gradient: "from-purple-500 via-pink-500 to-red-500",
    image: "/placeholder.svg?height=400&width=600"
  },
  {
    id: 2,
    title: "Smart Analytics",
    description: "Transform your data into actionable insights with AI-powered analytics",
    gradient: "from-blue-500 via-teal-500 to-green-500",
    image: "/placeholder.svg?height=400&width=600"
  },
  {
    id: 3,
    title: "Neural Engine",
    description: "Advanced neural networks for complex problem-solving and pattern recognition",
    gradient: "from-orange-500 via-amber-500 to-yellow-500",
    image: "/placeholder.svg?height=400&width=600"
  },
  {
    id: 4,
    title: "Vision Pro",
    description: "State-of-the-art computer vision solutions for real-world applications",
    gradient: "from-cyan-500 via-blue-500 to-indigo-500",
    image: "/placeholder.svg?height=400&width=600"
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
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-brand-primary mb-16">
          Our Products
        </h2>
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
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Previous product"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Next product"
          >
            <ChevronRight className="w-6 h-6" />
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
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover rounded-xl"
          />
        </motion.div>
      </div>
    </div>
  )
}

