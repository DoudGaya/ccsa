'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import banner from '@/public/banner-fixed.jpg'

interface Prompt {
  id: number
  title: string
  text: string
  category: string
}

const prompts: Prompt[] = [
  {
    id: 1,
    title: " Research and Innovation",
    text: `
       Develop, test and promote climate-smart
      agricultural technologies and practices to improve productivity, reduce
      greenhouse gas emissions and improve resiliency to climate change. 
    `,
    category: "Reasearch"
  },
  {
    id: 2,
    title: "Capacity Building",
    text: `Develop innovative programs to increase the capacity of
          students, farmers, policymakers, practitioners, and other stakeholders on
          climate-resilient practices with clear focus on agriculture
 `,
    category: "Social"
  },
  {
    id: 3,
    title: "Capacity Building",
    text: `Develop innovative programs to increase the capacity of
          students, farmers, policymakers, practitioners, and other stakeholders on
          climate-resilient practices with clear focus on agriculture
 `,
    category: "Social"
  },
  {
    id: 4,
    title: "Public-private partnerships (PPPs)",
    text: `
       Implement impactful projects by
      collaborating with the private sector, farmer's unions and associations, NGOs,
      CSOs, and international and multilateral organisations
        `,
    category: "Social"
  },
]

export default function ActivitiesComponent() {
  return (
    <section
      style={{
        backgroundImage: `url(${banner.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'

       }}
    className="bg-black  bg-fixed py-20 bg-blend-overlay bg-opacity-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-4xl font-bold text-white mb-16 text-center">
        Objectives
       </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {prompts.map((prompt) => (
            <PromptCard key={prompt.id} prompt={prompt} />
          ))}
        </div>
      </div>
    </section>
  )
}

function PromptCard({ prompt }: { prompt: Prompt }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{ scale: 1.02 }}
      className="group relative overflow-hidden"
    >
      <motion.div
        className="bg-zinc-900/80 rounded-xl p-6 h-full border border-zinc-800 cursor-pointer 
                   transition-colors duration-300 hover:border-zinc-700"
      >
        <div className="flex flex-col items-start h-full">
          <h3 className='text-white text-xs font-bold '>
            {prompt.title}
          </h3>
          <div className="text-white w-full flex justify-between pr-8">
           <p className=' w-full'> {prompt.text}</p>
          <ArrowUpRight className="w-5 h-5" />
          </div>
          <motion.div
            initial={{ opacity: 0.5 }}
            whileHover={{ opacity: 1 }}
            className="text-white"
          >
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileHover={{ opacity: 1, y: 0 }}
          className="absolute bottom-6 left-6 text-sm text-zinc-500"
        >
          {prompt.category}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

