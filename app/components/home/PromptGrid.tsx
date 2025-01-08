'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

interface Prompt {
  id: number
  title: string
  text: string
  category: string
}

const prompts: Prompt[] = [
  {
    id: 1,
    title: "Farmer Incubation Program",
    text: " Support for entrepreneurs in climate-smart solutions.",
    category: "History"
  },
  {
    id: 2,
    title: "Write a text inviting my neighbors to a barbecue",
    text: "Write a text inviting my neighbors to a barbecue",
    category: "Social"
  },
]

export default function PromptGrid() {
  return (
    <section className="bg-black py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-16 text-center">
        Programs & Activities
       </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
        className="bg-zinc-900 rounded-xl p-6 h-full border border-zinc-800 cursor-pointer 
                   transition-colors duration-300 hover:border-zinc-700"
      >
        <div className="flex justify-between items-start h-full">
          <h3 className='text-white text-lg'>
            {prompt.text}
          </h3>
          <p className="text-white text-lg pr-8">
            {prompt.text}
          </p>
          <motion.div
            initial={{ opacity: 0.5 }}
            whileHover={{ opacity: 1 }}
            className="text-white"
          >
            <ArrowUpRight className="w-5 h-5" />
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

