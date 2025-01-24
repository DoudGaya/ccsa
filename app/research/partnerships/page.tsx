import React from 'react'
import { ResearchBanner } from '../_components/ReasearchBanner'
import researchImage from '@/public/research-banner.jpg'
import ResearchPageComponent from '../_components/ResearchPageComponent'

const page = async () => {


  const BannerData =  {
    title: "Partnerships",
    description:
      "Foster partnerships with national and international organizations to leverage resources and expertise.",
    href: "/research/partnerships",
  }


  const pageData = {
    title: "Partnerships",
    description:
      `
       CCSA CUA actively fosters partnerships with national and international organizations to leverage resources and
        expertise, enhancing our impact on climate-smart agriculture.
      `,
      card: {
        title: "Our Partners",
        cards: [
          {
            title: "National agricultural research institutes",
            description:
              "We collaborate with national agricultural research institutes to develop and implement innovative solutions to agricultural challenges.",
          },
          {
            title: "International development agencies",
            description:
              "We partner with international development agencies to access funding and technical expertise for our projects.",
          },
          {
            title: "Private sector agribusinesses",
            description:
              "We work with private sector agribusinesses to promote sustainable agricultural practices and support smallholder farmers.",
          },
          {
            title: "Non-governmental organizations",
            description:
              "We collaborate with non-governmental organizations to implement community-based projects that address food security and climate change.",
          },
          {
            title: "Academic institutions worldwide",
            description:
              "We engage with academic institutions worldwide to share knowledge and best practices in climate-smart agriculture.",
          },
        ]
      },
      cta: {
        title: "Partner with Us",
        description: "Interested in collaborating? Reach out to explore partnership opportunities and join our mission to advance climate-smart agriculture."
      }  
  }

  const {title: pageTitle, description} = BannerData

  return (
    <div>
        <ResearchBanner 
            title={pageTitle}
            bannerImage={researchImage.src}
            description={description} /> 

            <ResearchPageComponent pageData={pageData} />
             {/* <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Partnerships</h1>

      <p className="mb-4">
        CCSA CUA actively fosters partnerships with national and international organizations to leverage resources and
        expertise, enhancing our impact on climate-smart agriculture.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-4">Our Partners</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>National agricultural research institutes</li>
        <li>International development agencies</li>
        <li>Private sector agribusinesses</li>
        <li>Non-governmental organizations</li>
        <li>Academic institutions worldwide</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-4">Collaborative Projects</h2>
      <p className="mb-4">
        Through our partnerships, we've initiated groundbreaking research projects, exchange programs, and joint
        initiatives that address pressing agricultural challenges in Nigeria and beyond.
      </p>

      <div className="bg-gray-100 p-4 rounded-lg mt-6">
        <h3 className="text-xl font-semibold mb-2">Partner with Us</h3>
        <p>
          Interested in collaborating? Reach out to explore partnership opportunities and join our mission to advance
          climate-smart agriculture.
        </p>
      </div>
    </div> */}
    </div>
  )
}

export default page