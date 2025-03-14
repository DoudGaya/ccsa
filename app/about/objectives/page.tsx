import aboutBannerImage from "@/public/about-banner.jpg"
import { ArrowRight, Leaf, Cpu, Briefcase, FileText, Handshake } from "lucide-react"
import { AboutBanner } from "../_component/AboutBanner"
import Link from "next/link"
import Image from "next/image"

// Research items array with added icon and image properties
export const researchItems = [
  {
    title: "Sustainable Practice",
    description: "Sustainably Advance Climate-Smart Agricultural Practices for Enhanced Food and Nutrition Security.",
    href: "/research/climate-smart-agriculture",
    icon: <Leaf className="h-6 w-6 text-green-600" />,
    color: "bg-green-100",
    textColor: "text-green-700",
    borderColor: "border-green-200",
    image: "/images/sustainable-agriculture.jpg",
  },
  {
    title: "Emerging Technologies",
    description:
      "Leverage CU emerging technologies at the maker space to promote digital and data analytics transformation in Agriculture.",
    href: "/research/emerging-technologies",
    icon: <Cpu className="h-6 w-6 text-blue-600" />,
    color: "bg-blue-100",
    textColor: "text-blue-700",
    borderColor: "border-blue-200",
    image: "/images/emerging-technologies.jpg",
  },
  {
    title: "Agri-Entrepreneurship",
    description:
      "Provide training and capacity-building programs for farmers, extension agents, and other stakeholders.",
    href: "/research/ag-entrepreneurship",
    icon: <Briefcase className="h-6 w-6 text-amber-600" />,
    color: "bg-amber-100",
    textColor: "text-amber-700",
    borderColor: "border-amber-200",
    image: "/images/agri-entrepreneurship.jpg",
  },
  {
    title: "Policy and Advocacy",
    description:
      "Promote resilience and adaptation to environmental changes through policy, advocacy and stakeholder engagement.",
    href: "/research/policy-advocacy",
    icon: <FileText className="h-6 w-6 text-purple-600" />,
    color: "bg-purple-100",
    textColor: "text-purple-700",
    borderColor: "border-purple-200",
    image: "/images/policy-advocacy.jpg",
  },
  {
    title: "Partnerships",
    description:
      "Foster partnerships with national and international organizations to leverage resources and expertise.",
    href: "/research/partnerships",
    icon: <Handshake className="h-6 w-6 text-teal-600" />,
    color: "bg-teal-100",
    textColor: "text-teal-700",
    borderColor: "border-teal-200",
    image: "/images/partnerships.jpg",
  },
]

const ObjectivesPage = () => {
  return (
    <div className="flex flex-col font-main items-center justify-center">
      <AboutBanner
        bannerImage={aboutBannerImage.src}
        title="Our Objectives"
        description="Driving Innovation in Climate-Smart Agriculture"
      />

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold mb-4">Strategic Objectives</h1>
          <p className="text-lg max-w-3xl mx-auto text-gray-700">
            The Centre for Climate-Smart Agriculture (CCSA) is committed to advancing sustainable agricultural practices
            through five core strategic objectives that guide our research, innovation, and outreach efforts.
          </p>
        </div>

        {/* Featured Objective */}
        {/* <div className="mb-16 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl overflow-hidden shadow-lg">
          <div className="md:flex">
            <div className="md:w-1/2 relative h-80">
              <Image
                src="/images/climate-smart-agriculture.jpg"
                alt="Climate-Smart Agriculture"
                fill
                className="object-cover"
              />
            </div>
            <div className="md:w-1/2 p-8">
              <div className="flex items-center mb-4">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <Leaf className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold">Our Mission</h2>
              </div>
              <p className="mb-6 text-gray-700">
                At CCSA, we are dedicated to developing and implementing innovative solutions that enhance agricultural
                productivity while promoting environmental sustainability and climate resilience. Our objectives are
                designed to address the complex challenges facing modern agriculture through a holistic,
                interdisciplinary approach.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-md transition duration-300"
              >
                Learn More About Us <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div> */}

        {/* Objectives Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {researchItems.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 flex flex-col"
            >
              <div className="relative h-48">
                <Image
                  src={item.image || "/placeholder.svg?height=200&width=400"}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                  <div className={`${item.color} p-4 rounded-full`}>{item.icon}</div>
                </div>
              </div>

              <div className="p-6 flex-grow">
                <h3 className={`text-xl font-bold mb-3 ${item.textColor}`}>{item.title}</h3>
                <p className="text-gray-700 mb-4">{item.description}</p>
              </div>

              <div className="px-6 pb-6">
                <Link
                  href={item.href}
                  className={`inline-flex items-center ${item.textColor} hover:underline font-medium`}
                >
                  Explore Initiative <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center bg-gray-50 p-8 rounded-xl">
          <h2 className="text-2xl font-bold mb-4">Join Our Mission</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            We invite researchers, farmers, policymakers, and industry partners to collaborate with us in advancing
            climate-smart agricultural practices for a more sustainable future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/research"
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-md transition duration-300"
            >
              Explore Our Research
            </Link>
            <Link
              href="/contact"
              className="bg-white border border-green-600 hover:bg-green-50 text-green-600 font-medium py-2 px-6 rounded-md transition duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ObjectivesPage


// import React from 'react'
// import aboutBannerImage from '@/public/about-banner.jpg'
// import { ArrowRight, Leaf, Users, BookOpen, Zap, Globe } from 'lucide-react'
// import { AboutBanner } from '../_component/AboutBanner'
// import Link from 'next/link'
// // import { AboutBanner } from '../about/_component/AboutBanner'
// // import AboutGrid from '../about/_component/AboutGrid'
// export const researchItems: { title: string; href: string; description: string }[] = [
//   {
//     title: "Sustainable Practice",
//     description:
//       "Sustainably Advance Climate-Smart Agricultural Practices for Enhanced Food and Nutrition Security.",
//     href: "/research/climate-smart-agriculture",
//   },
//   {
//     title: "Emerging Technologies",
//     description:
//       "Leverage CU emerging technologies at the maker space to promote digital and data analytics transformation in Agriculture.",
//     href: "/research/emerging-technologies",
//   },
//   {
//     title: "Agri-Entrepreneurship",
//     description:
//       "Provide training and capacity-building programs for farmers, extension agents, and other stakeholders.",
//     href: "/research/ag-entrepreneurship",
//   },
//   {
//     title: "Policy and Advocacy",
//     description:
//       "Promote resilience and adaptation to environmental changes through policy, advocacy and stakeholder engagement.",
//     href: "/research/policy-advocacy",
//   },
//   {
//     title: "Partnerships",
//     description:
//       "Foster partnerships with national and international organizations to leverage resources and expertise.",
//     href: "/research/partnerships",
//   },
// ]

// const page = () => {
//   return (
//     <div className=' flex flex-col items-center justify-center'>
//       <AboutBanner 
//         bannerImage={aboutBannerImage.src}
//         title='Climate Smart Tect'
//         description='Climatesmart Technologies'
//       />
//       <div className="container mx-auto px-4 py-8 max-w-5xl font-main font-semibold">
//         <h1 className="text-3xl font-bold mb-8 text-center">Objectives  Areas</h1>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {/* GOES */}
//         </div>
//         </div>
  
//     </div>
//   )
// }

// export default page