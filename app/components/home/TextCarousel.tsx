'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function TextCarousel({ texts, className = '' }: { texts: string[]; className?: string }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [texts.length])

  return (
    <div className={`relative min-h-[4rem] sm:min-h-[5rem] md:min-h-[6rem] ${className}`}>
      <AnimatePresence>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="break-words text-center">
            {texts[currentIndex]}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}




// 'use client'

// import { useState, useEffect } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'

// export default function TextCarousel({ texts, className = '' }: { texts: string[]; className?: string }) {
//   const [currentIndex, setCurrentIndex] = useState(0)

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length)
//     }, 5000)

//     return () => clearInterval(interval)
//   }, [texts.length])

//   return (
//     <div className={`relative h-20 ${className}`}>
//       <AnimatePresence>
//         <motion.div
//           key={currentIndex}
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: -20 }}
//           transition={{ duration: 0.5 }}
//           className="absolute inset-0 flex items-center justify-center"
//         >
//           {texts[currentIndex]}
//         </motion.div>
//       </AnimatePresence>
//     </div>
//   )
// }

