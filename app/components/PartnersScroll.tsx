'use client'

import { motion } from 'framer-motion'
import Image, { StaticImageData } from 'next/image'
import afdb from '@/app/assets/partners/afdb.png'
import africanHarves from '@/app/assets/partners/afirica-harves.png'
import agra from '@/app/assets/partners/agra.webp'
import fao from '@/app/assets/partners/fao.png'
import fmafs from '@/app/assets/partners/fmafs.webp'
import ifad from '@/app/assets/partners/ifad.png'
import usda from '@/app/assets/partners/usda.svg'

interface Partner {
  name: string
  logo: StaticImageData
}

const partners: Partner[] = [
  {
    name: "AFDA",
    logo: afdb
  },
  {
    name: "African Harves",
    logo: africanHarves
  },
  {
    name: "AGRA",
    logo: agra
  },
  {
    name: "FAO",
    logo: fao
  },
  {
    name: "FMAFS",
    logo: fmafs
},
  {
    name: "IFAD",
    logo: ifad
  },
  {
    name: "USDA",
    logo: usda
}
//   {
//     name: "Atlassian",
//     logo: "/placeholder.svg?height=40&width=120"
//   },
//   {
//     name: "Basic/Dept",
//     logo: "/placeholder.svg?height=40&width=120"
//   }
]

export default function PartnersScroll() {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4 mb-12">
        <h2 className="text-4xl md:text-4xl text-brand font-bold text-center mb-4">
        Our Strategic Partnerships
        </h2>
        <p className="text-xl text-gray-600 text-center">
          Partnering with world-class companies to transform their businesses
        </p>
      </div>

      <div className="relative w-full overflow-hidden bg-gradient-to-r from-white via-white to-gray-50">
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-10" />

        {/* Scrolling Content */}
        <div className="flex overflow-hidden py-8">
          <motion.div
            animate={{
              x: [-1035, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="flex gap-16 mx-4"
          >
            {/* First Set of Logos */}
            {[...Array(2)].map((_, setIndex) => (
              <div key={setIndex} className="flex gap-16">
                {
                partners.map((partner, index) => (
                  <div
                    key={`${setIndex}-${index}`}
                    className="flex items-center justify-center w-[120px]"
                  >
                    <Image
                      src={partner.logo.src}
                      alt={partner.name}
                      width={120}
                      height={40}
                      className="opacity-70 hover:opacity-100 h-24 object-contain transition-opacity grayscale hover:grayscale-0"
                    />
                  </div>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

