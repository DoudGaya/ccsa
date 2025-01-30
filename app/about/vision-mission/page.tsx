import React from 'react'
import aboutBannerImage from '@/public/about-banner.jpg'
import { ArrowRight, Leaf, Users, BookOpen, Zap, Globe } from 'lucide-react'
import { AboutBanner } from '../_component/AboutBanner'
import AboutGrid from '../_component/AboutGrid'

const page = () => {
  return (
    <div className=' flex flex-col items-center justify-center'>
      <AboutBanner 
        bannerImage={aboutBannerImage.src}
        title='Climate Smart Tect'
        description='Climatesmart Technologies'
      />

<section className="mb-16 py-20 max-w-7xl mx-auto flex text-center md:text-start items-center flex-col">
          <h2 className="text-3xl font-bold mb-6 text-[rgb(6,54,103)] dark:text-blue-500">Vision & Mission</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className=" p-6  bg-white dark:bg-black rounded-lg text-blue-50 py-20 shadow-md">
              <h3 className="text-xl font-semibold mb-4 flex  flex-col md:flex-row w-full text-center items-center">
                <Leaf className="mr-2 text-[rgb(6,54,103)] dark:text-blue-500 h-14 w-14 md:h-8 md:w-8 text-lg" />
                <p className=' font-blog text-2xl '> Our Vision</p>
              </h3>
              <p>
                To foster climate-resilient agricultural systems that promote food security, 
                enhance livelihoods, and sustain the environment through innovation, 
                education, research and practice.
              </p>
            </div>
            <div className=" p-6  bg-white dark:bg-black rounded-lg text-blue-50 py-20 shadow-md">
              <h3 className="text-xl font-semibold mb-4 flex  flex-col md:flex-row w-full text-center items-center">
                <Globe className="mr-2 text-[rgb(6,54,103)] dark:text-blue-500 h-14 w-14 md:h-8 md:w-8 text-l" />
                <p className=' font-blog text-2xl '> Our Mission</p>
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

        <section className=' w-full max-w-6xl text-black dark:text-white py-20 mx-auto flex flex-col items-center'>
          <h2 className=' text-2xl font-blog py-4'>
            Our Goals
          </h2>
            {/* <AboutGrid  />  */}
        </section>
    </div>
  )
}

export default page