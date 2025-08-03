'use client'

import { motion } from 'framer-motion'
import { 
  Lightbulb, 
  Users, 
  Handshake, 
  Scale, 
  Cpu,
  ArrowRight,
  ChevronRight
} from 'lucide-react'
import Link from "next/link"

interface MandateArea {
  id: number
  title: string
  description: string
  icon: React.ComponentType<any>
  color: string
  gradient: string
  href: string
}

const researchItems: { title: string; href: string; description: string }[] = [
  {
    title: "Sustainable Practice",
    description:
      "Sustainably Advance Climate-Smart Agricultural Practices for Enhanced Food and Nutrition Security.",
    href: "/research/climate-smart-agriculture",
  },
  {
    title: "Emerging Technologies",
    description:
      "Leverage CU emerging technologies at the maker space to promote digital and data analytics transformation in Agriculture.",
    href: "/research/emerging-technologies",
  },
  {
    title: "Agri-Entrepreneurship",
    description:
      "Provide training and capacity-building programs for farmers, extension agents, and other stakeholders.",
    href: "/research/ag-entrepreneurship",
  },
  {
    title: "Policy and Advocacy",
    description:
      "Promote resilience and adaptation to environmental changes through policy, advocacy and stakeholder engagement.",
    href: "/research/policy-advocacy",
  },
  {
    title: "Partnerships",
    description:
      "Foster partnerships with national and international organizations to leverage resources and expertise.",
    href: "/research/partnerships",
  },
]

// Icon mapping for the research items
const iconMapping: Record<string, React.ComponentType<any>> = {
  "Sustainable Practice": Lightbulb,
  "Emerging Technologies": Cpu,
  "Agri-Entrepreneurship": Users,
  "Policy and Advocacy": Scale,
  "Partnerships": Handshake,
}

// Convert research items to mandate areas with design elements
const mandateAreas: MandateArea[] = researchItems.map((item, index) => ({
  id: index + 1,
  title: item.title,
  description: item.description,
  href: item.href,
  icon: iconMapping[item.title] || Lightbulb,
  color: "from-brand to-brand",
  gradient: "bg-gradient-to-br from-brand/20 to-brand/30"
}))

export default function MandateAreas() {
  return (
    <section className="py-20 bg-gradient-to-b from-brand/5 via-white to-brand/10 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(8,44,60,0.3)_1px,transparent_0)] bg-[size:20px_20px]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-5xl md:text-6xl font-main font-bold text-brand mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Our Mandate Areas
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-poppins"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Driving sustainable agricultural transformation through strategic focus areas that address climate challenges and promote innovation
          </motion.p>
        </motion.div>

        {/* Grid Layout for first 4 areas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-8">
          {mandateAreas.slice(0, 4).map((area, index) => (
            <MandateCard key={area.id} area={area} index={index} />
          ))}
        </div>

        {/* Full-width card for Digital Transformation */}
        <div className="mt-8">
          <MandateCard area={mandateAreas[4]} index={4} isFullWidth />
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <Link href="/contact">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center space-x-2 bg-brand text-white px-8 py-4 rounded-lg font-poppins font-semibold text-lg hover:bg-brand/90 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <span>Learn More About Our Work</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

function MandateCard({ 
  area, 
  index, 
  isFullWidth = false 
}: { 
  area: MandateArea
  index: number
  isFullWidth?: boolean 
}) {
  const Icon = area.icon
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className={`group relative overflow-hidden rounded-xl bg-white border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-500 ${
        isFullWidth ? 'lg:col-span-2' : ''
      }`}
    >
      {/* Brand Background on Hover */}
      <div className="absolute inset-0 bg-brand/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Content */}
      <div className="relative z-10 p-8">
        <div className={`flex items-start space-x-6 ${isFullWidth ? 'lg:space-x-8' : ''}`}>
          {/* Icon */}
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
            className={`flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-r ${area.color} flex items-center justify-center shadow-lg`}
          >
            <Icon className="w-8 h-8 text-white" />
          </motion.div>
          
          {/* Text Content */}
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-brand mb-4 font-poppins group-hover:text-brand/80 transition-colors duration-300">
              {area.title}
            </h3>
            <p className="text-gray-600 leading-relaxed font-poppins group-hover:text-gray-700 transition-colors duration-300">
              {area.description}
            </p>
            
            {/* Read More Link */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="mt-4"
            >
              <Link href={area.href}>
                <button className="inline-flex items-center space-x-2 text-brand font-semibold hover:text-brand/80 transition-colors duration-300 group/link">
                  <span>Learn More</span>
                  <ChevronRight className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform duration-300" />
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Hover Border Effect */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-brand/20 rounded-xl transition-colors duration-500" />
    </motion.div>
  )
}
