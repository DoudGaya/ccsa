import React from 'react'
import { ResearchBanner } from '../_components/ReasearchBanner'
import researchImage from '@/public/research-banner.jpg'
import ResearchPageComponent from '../_components/ResearchPageComponent'

const page = async () => {


    const bannerItems =   {
        title: "Policy and Advocacy",
        description:
          "Promote resilience and adaptation to environmental changes through policy, advocacy and stakeholder engagement.",
        href: "/research/policy-advocacy",
      }


      const pageData = {
        title: "Policy and Advocacy",
        description:
          `
          At CCSA CUA, we are dedicated to promoting resilience and adaptation to environmental changes through
          evidence-based policy, advocacy, and stakeholder engagement.
          `,
          card: {
            title: "Our Initiatives",
            cards: [
              {
                title: "Research-driven policy recommendations",
                description:
                  "Advocacy for climate-smart agricultural practices",
              },
              {
                title: "Stakeholder forums and policy dialogues",
                description:
                  "Capacity building for policymakers",
              },
              {
                title: "Monitoring and evaluation of agricultural policies",
                description:
                  "Monitoring and evaluation of agricultural policies",
              }
            ]
          },
          cta: {
            title: "Engage with Us",
            description: "Participate in our upcoming policy forums or access our latest policy briefs to stay informed on agricultural policy developments."
          }
      }
      
  return (
    <div>
        <ResearchBanner 
            title={bannerItems.title} 
            bannerImage={researchImage.src}
            description={bannerItems.description} /> 

            <ResearchPageComponent pageData={pageData} />

{/* <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Policy and Advocacy</h1>

      <p className="mb-4">
        At CCSA CUA, we are dedicated to promoting resilience and adaptation to environmental changes through
        evidence-based policy, advocacy, and stakeholder engagement.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-4">Our Initiatives</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Research-driven policy recommendations</li>
        <li>Advocacy for climate-smart agricultural practices</li>
        <li>Stakeholder forums and policy dialogues</li>
        <li>Capacity building for policymakers</li>
        <li>Monitoring and evaluation of agricultural policies</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-4">Policy Briefs</h2>
      <p className="mb-4">
        We regularly publish policy briefs on critical issues affecting Nigerian agriculture, providing actionable
        insights for policymakers and stakeholders.
      </p>

      <div className="bg-gray-100 p-4 rounded-lg mt-6">
        <h3 className="text-xl font-semibold mb-2">Engage with Us</h3>
        <p>
          Participate in our upcoming policy forums or access our latest policy briefs to stay informed on agricultural
          policy developments.
        </p>
      </div>
    </div> */}
    </div>
  )
}

export default page