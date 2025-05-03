import React from 'react'
import { InnovationBanner } from '../_components/InnovationBanner'
import innovationBannerImmage from '@/public/innovation-banner.jpg'
import makersLab from '@/public/makers-lab.jpg'
import Image from "next/image"
import Link from "next/link"
import {
  DrillIcon as Drone,
  HeadsetIcon as VrHeadset,
  BotIcon as Robot,
  PrinterIcon as Printer3d,
  Brain,
  Zap,
  Users,
  ExternalLink,
} from "lucide-react"
import PublicBanners from '@/app/components/PublicBanners'


const pageData = {
    title: "Agri-Tech Tools",
    description:
      "We are developing and leveraging Agri-Tech Tools to improve farming practices",
    href: "/media/interviews",
  }

const page = () => {
  return (
    <div>

      <PublicBanners title={pageData.title} message={pageData.description} />


<div className="container mx-auto px-4 py-8 max-w-5xl font-main">
      <h1 className="text-3xl font-bold mb-8 text-center">Agri-Tech Tools</h1>
      <h2 className="text-2xl font-semibold mb-6 text-center text-green-700">
        Driving Innovation in Climate-Smart Agriculture
      </h2>

      {/* Hero Image */}
     

      {/* Introduction */}
      <section className="mb-12">
        <p className="mb-4 text-lg">
          At the Centre for Climate-Smart Agriculture (CCSA), we are committed to leveraging technology to transform
          agricultural practices, enhance productivity, and promote sustainability. By collaborating with farmers,
          policymakers, scientists, AI engineers, agronomists, remote sensing specialists, software developers, and
          robotics experts, we develop and test cutting-edge agri-tech tools that:
        </p>
        <ul className="list-disc pl-8 mb-6 space-y-2">
          <li>Reduce resource inputs such as water, fertilisers, and pesticides</li>
          <li>Improve crop yield and productivity</li>
          <li>Advancing sustainable and climate-resilient farming practices</li>
        </ul>
      </section>

      {/* Maker Space */}
      <section className="mb-12">
        <div className="bg-gradient-to-r from-green-50 dark:from-gray-950 dark:to-slate-950 to-blue-50 p-6 rounded-lg border dark:border-green-800 border-gray-200">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="md:w-1/2">
          <h2 className="text-2xl font-semibold mb-4">Maker Space: A Hub for Agri-Tech Innovation</h2>
              <p className="mb-4">
                Located at the Cosmopolitan University City Campus, CBD, our Maker Space is a dynamic and innovative
                space for agricultural technology development, prototyping, and testing. It provides state-of-the-art
                facilities where researchers, engineers, and entrepreneurs collaborate to create smart farming solutions
                that integrate AI, IoT, robotics, drones technologies and renewable energy.
              </p>
            </div>
            <div className="md:w-1/2">
              <Image
                src={makersLab.src}
                alt="CCSA Maker Space"
                width={500}
                height={300}
                className="rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Key Facilities */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 border-b pb-2">Key Facilities & Specialised Sections</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Drone Technologies Lab */}
          <div className="bg-white dark:bg-slate-950 p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <Drone className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold">Drone Technologies Lab</h3>
            </div>
            <p>
              A dedicated space where certified drone experts work on satellite imaging, remote sensing, and aerial
              monitoring to enhance precision agriculture.
            </p>
          </div>

          {/* Virtual Reality Suite */}
          <div className="bg-white dark:bg-slate-950 p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <div className="bg-purple-100 p-3 rounded-full mr-4">
                <VrHeadset className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold">Virtual Reality Suite</h3>
            </div>
            <p>
              Offers immersive simulations for training in precision farming, crop management, and climate modelling.
            </p>
          </div>

          {/* Robotics & IoT Section */}
          <div className="bg-white dark:bg-slate-950 p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <div className="bg-teal-100 p-3 rounded-full mr-4">
                <Robot className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold">Robotics & IoT Section</h3>
            </div>
            <p>
              Develops autonomous farming equipment, smart irrigation systems, and sensor-based monitoring tools for
              data-driven decision-making.
            </p>
          </div>

          {/* Large-Scale 3D Printing */}
          <div className="bg-white dark:bg-slate-950 p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <div className="bg-orange-100 p-3 rounded-full mr-4">
                <Printer3d className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold">Large-Scale 3D Printing</h3>
            </div>
            <p>
              Two industrial-scale additive manufacturing printers for rapid prototyping of farm tools, irrigation
              components, and machinery parts.
            </p>
          </div>

          {/* AI Corner */}
          <div className="bg-white dark:bg-slate-950 p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <div className="bg-indigo-100 p-3 rounded-full mr-4">
                <Brain className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold">AI Corner</h3>
            </div>
            <p>
              A dedicated space for developing AI-driven agricultural solutions, such as yield forecasting, pest
              detection, and climate advisory services.
            </p>
          </div>

          {/* Electrical & Power Machines Section */}
          <div className="bg-white dark:bg-slate-950 p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <div className="bg-yellow-100 p-3 rounded-full mr-4">
                <Zap className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold">Electrical & Power Machines Section</h3>
            </div>
            <p>
              Focuses on renewable energy innovations, including solar-powered irrigation and off-grid electrification
              for rural farming communities.
            </p>
          </div>
        </div>
      </section>

      {/* Collaborations */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 border-b pb-2">Collaborations & Capacity Building</h2>

        <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg mb-8">
          <div className="flex items-start mb-4">
            <div className="bg-green-100 p-3 rounded-full mr-4 mt-1">
              <Users className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <p className="mb-4">
                Through strategic partnerships with leading institutions and organisations, CCSA actively engages in
                capacity-building initiatives to empower farmers, researchers, and agri-tech innovators.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-950 p-6 rounded-lg shadow-sm border">
            <h3 className="text-xl font-semibold mb-3">AI Policy and Practice Lab Project</h3>
            <div className="flex flex-col gap-3 mt-4">
             <div className=" flex space-x-3">
              <div className=" flex flex-col">
              <div className="">

AI Policy and Practice Lab Project 
<Link
    href="https://ideas.cosmopolitan.edu.ng"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
  >
   (ideas.cosmopolitan.edu.ng) <ExternalLink className="h-3 w-3 ml-1" />
  </Link>

 – A collaboration with the
 
  <Link
    href="https://projects.worldbank.org/en/projects-operations/project-detail/P166239"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex mx-2 items-center text-sm text-blue-600 hover:text-blue-800"
  >
     ( World Bank  ) <ExternalLink className="h-3 w-3 ml-1" />
  </Link>, Young Innovators of Nigeria  <Link
    href="https://yinigeria.com.ng"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
  >
    Young Innovators of Nigeria <ExternalLink className="h-3 w-3 ml-1" />
  </Link>, and the Federal Ministry of Education 
  
  <Link
    href="https://ideasproject.gov.ng"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center mx-2 text-sm text-blue-600 hover:text-blue-800"
  >
    (https://ideasproject.gov.ng ) <ExternalLink className="h-3 w-3 ml-1" />
  </Link>, providing training in AI, emerging digital technologies, policy development, advanced software engineering, and creative skills tailored for agricultural innovation. Centre for Collaborative AI 

                <Link
                  href="https://cosmopolitan.edu.ng/collaborative-centre-for-ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center mx-2 text-sm text-blue-600 hover:text-blue-800"
                >
                  (cosmopolitan.edu.ng/collaborative-centre-for-ai) <ExternalLink className="h-3 w-3 ml-1" />
                </Link>
                – A research centre focused on precision farming, climate risk assessment, and data-driven agricultural policy.
                </div>
              </div>
             </div>
            </div>
          </div>

          {/* Centre for Collaborative AI */}
          <div className="bg-white dark:bg-slate-950 p-6 rounded-lg shadow-sm border">
            <h3 className="text-xl font-semibold mb-3">Centre for Collaborative AI</h3>
            <p className="mb-3">
              A research centre focused on precision farming, climate risk assessment, and data-driven agricultural
              policy.
            </p>
            <Link
              href="https://cosmopolitan.edu.ng/collaborative-centre-for-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
            >
              Learn more about the Centre <ExternalLink className="h-3 w-3 ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Conclusion */}
      <section className="bg-gradient-to-r from-green-50 dark:from-gray-900 dark:to-slate-900 to-blue-50 p-6 rounded-lg">
        <p className="mb-4">
          At CCSA, we continuously expand our digital platforms, explore new technologies, and engage with diverse
          stakeholders to drive innovation in sustainable agriculture. Through our Maker Space and Agri-Tech Tools, we
          aim to bridge the gap between research and real-world applications, ensuring farmers and agripreneurs can
          access the best tools, knowledge, and resources to thrive in an evolving agricultural landscape.
        </p>
      </section>
    </div>
    </div>
  )
}

export default page