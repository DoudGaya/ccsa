import { Metadata } from 'next'
import Image from 'next/image'
import { ArrowRight, Leaf, Users, BookOpen, Zap, Globe } from 'lucide-react'
import policy from '@/public/policy.jpg'

import { Button } from "@/components/ui/button"
import PublicBanners from '../components/PublicBanners'
import PartnersScroll from '../components/PartnersScroll'
import { CallToAction } from '../components/CallToAction'
import ActivitiesComponent from '../components/home/ActivitiesComponent'
import AboutGrid from './_component/AboutGrid'

export const metadata: Metadata = {
  title: 'About Us | CCSA ',
  description: 'Learn about the Centre for Climate-Smart Agriculture (CCSA) at Cosmopolitan University, Abuja, and our mission to transform agriculture in Sub-Saharan Africa.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <PublicBanners title={'Our Story'} message={`
                The Centre for Climate-Smart Agriculture (CCSA) at Cosmopolitan University, Abuja, 
                was established to address the unprecedented challenges posed by climate change 
                to the global agricultural sector. With a focus on Sub-Saharan Africa, we aim to 
                balance the significant risks from climate-induced disruptions with the immense 
                opportunities to innovate and transform agricultural practices.
        `} />
      <main className=" mx-auto w-full py-20 px-4 lg:px-0">

        <section className="mb-16 max-w-7xl mx-auto flex text-center md:text-start items-center flex-col">
          <h2 className="text-3xl font-bold mb-6 text-[rgb(6,54,103)]">Vision & Mission</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className=" p-6  bg-white py-20 shadow-md">
              <h3 className="text-xl font-semibold mb-4 flex  flex-col md:flex-row w-full text-center items-center">
                <Leaf className="mr-2 text-[rgb(6,54,103)] h-14 w-14 md:h-8 md:w-8 text-lg" />
                <p> Our Vision</p>
              </h3>
              <p>
                To foster climate-resilient agricultural systems that promote food security, 
                enhance livelihoods, and sustain the environment through innovation, 
                education, research and practice.
              </p>
            </div>
            <div className=" p-6  bg-white py-20 shadow-md">
              <h3 className="text-xl font-semibold mb-4 flex  flex-col md:flex-row w-full text-center items-center">
                <Globe className="mr-2 text-[rgb(6,54,103)] h-14 w-14 md:h-8 md:w-8 text-l" />
                <p> Our Mission</p>
              </h3>
              <p>
                To drive the transformation of agriculture in Sub-Saharan Africa by advancing 
                climate-smart practices through cutting-edge research, innovative education, 
                and collaborative partnerships, fostering resilience, enhancing capacity, and 
                ensuring sustainability in agricultural systems.
              </p>
            </div>
          </div>
        </section>

        <section className=' w-full bg-[rgb(6,54,103)] text-white py-20 max-w-max mx-auto flex flex-col items-center'>
            <AboutGrid  /> 
        </section>

        <ActivitiesComponent />


        <PartnersScroll />

        <CallToAction />
      </main>
    </div>
  )
}



// import React from 'react'
// import PublicBanners from '../components/PublicBanners'

// const page = () => {
//   return (
//     <div className=' h-full w-full'>
//       <PublicBanners />

//     </div>
//   )
// }

// export default page