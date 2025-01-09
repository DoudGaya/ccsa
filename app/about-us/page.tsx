import { Metadata } from 'next'
import Image from 'next/image'
import { ArrowRight, Leaf, Users, BookOpen, Zap, Globe } from 'lucide-react'
import policy from '@/public/policy.jpg'

import { Button } from "@/components/ui/button"
import PublicBanners from '../components/PublicBanners'
import PartnersScroll from '../components/PartnersScroll'
import { CallToAction } from '../components/CallToAction'
import ActivitiesComponent from '../components/home/ActivitiesComponent'

export const metadata: Metadata = {
  title: 'About Us | ',
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

        <ActivitiesComponent />

        {/* <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-[rgb(6,54,103)]">Our Objectives</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Zap className="w-8 h-8 text-[rgb(6,54,103)]" />,
                title: "Research and Innovation",
                description: "Develop, test and promote climate-smart agricultural technologies and practices."
              },
              {
                icon: <Users className="w-8 h-8 text-[rgb(6,54,103)]" />,
                title: "Capacity Building",
                description: "Increase the capacity of stakeholders on climate-resilient agricultural practices."
              },
              {
                icon: <BookOpen className="w-8 h-8 text-[rgb(6,54,103)]" />,
                title: "Policy and Advocacy",
                description: "Shape policies that support climate-smart agriculture through collaboration."
              },
              {
                icon: <Globe className="w-8 h-8 text-[rgb(6,54,103)]" />,
                title: "Public-Private Partnerships",
                description: "Implement impactful projects through diverse collaborations."
              },
              {
                icon: <Zap className="w-8 h-8 text-[rgb(6,54,103)]" />,
                title: "Digital Transformation",
                description: "Leverage emerging technologies to enhance agricultural practices and outcomes."
              }
            ].map((objective, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                {objective.icon}
                <h3 className="text-xl font-semibold my-4">{objective.title}</h3>
                <p>{objective.description}</p>
              </div>
            ))}
          </div>
        </section> */}

        <PartnersScroll />

        {/* <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-[rgb(6,54,103)]">Strategic Partnerships</h2>
          <p className="text-lg mb-6">
            CCSA collaborates with leading global and regional organizations to advance 
            climate-smart agricultural practices and mitigate risks associated with future climate crises.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "International Fund for Agricultural Development (IFAD)",
              "Alliance for a Green Revolution in Africa (AGRA)",
              "World Bank Group",
              "African Development Bank (AfDB)",
              "Food and Agriculture Organization (FAO)",
              "United States Department of Agriculture (USDA)"
            ].map((partner, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded-lg">
                {partner}
              </div>
            ))}
          </div>
        </section> */}

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