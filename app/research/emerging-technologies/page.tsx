import React from 'react'
import { ResearchBanner } from '../_components/ReasearchBanner'
import researchImage from '@/public/research-banner.jpg'
import ResearchPageComponent from '../_components/ResearchPageComponent'
import PublicBanners from '@/app/components/PublicBanners'

const page = async () => {
    
    const pageBanner =  {
        title: "Emerging Technologies",
        description:
          "Leverage CU emerging technologies at the maker space to promote digital and data analytics transformation in Agriculture.",
        href: "/research/emerging-technologies",
      }


      const pageData = {
        title: "Emerging Technologies in Agriculture",
        description:
          `
          At CCSA CUA, we leverage cutting-edge technologies from Cosmopolitan University's maker space to drive digital
          and data analytics transformation in agriculture.
          `,
          card: {
            title: "Our Focus Areas",
            cards: [
              {
                title: "Precision agriculture using IoT sensors and drones",
                description:
                  "Big data analytics for crop yield prediction and optimization",
              },
              {
                title: "Blockchain technology for supply chain transparency",
                description:
                  "AI and machine learning for pest and disease detection",
              },
              {
                title: "Smart irrigation systems and water management",
                description:
                  "Smart irrigation systems and water management",
              }
            ]
          },
          cta: {
            title: "Innovation Hub",
            description: "Our state-of-the-art maker space serves as an innovation hub where students, researchers, and industry partners collaborate to develop and test new agricultural technologies."
          }
      }

  return (
    <div>
        {/* <ResearchBanner 
            title={pageBanner.title}
            bannerImage={researchImage.src}
            description={ pageBanner.description } />  */}
            <PublicBanners
            title={pageBanner.title}
            message={pageBanner.description}
          />
          


            <ResearchPageComponent pageData={pageData} />

{/* <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Emerging Technologies in Agriculture</h1>
      <p className="mb-4">
        At CCSA CUA, we leverage cutting-edge technologies from Cosmopolitan University's maker space to drive digital
        and data analytics transformation in agriculture.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-4">Our Focus Areas</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Precision agriculture using IoT sensors and drones</li>
        <li>Big data analytics for crop yield prediction and optimization</li>
        <li>Blockchain technology for supply chain transparency</li>
        <li>AI and machine learning for pest and disease detection</li>
        <li>Smart irrigation systems and water management</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-4">Innovation Hub</h2>
      <p className="mb-4">
        Our state-of-the-art maker space serves as an innovation hub where students, researchers, and industry partners
        collaborate to develop and test new agricultural technologies.
      </p>

      <div className="bg-gray-100 p-4 rounded-lg mt-6">
        <h3 className="text-xl font-semibold mb-2">Explore Our Technologies</h3>
        <p>
          Visit our maker space to see how we're shaping the future of agriculture through technology. Schedule a tour
          or attend one of our tech workshops.
        </p>
      </div>
    </div> */}
    </div>
  )
}

export default page