import React from 'react'
import { ResearchBanner } from '../_components/ReasearchBanner'
import researchImage from '@/public/research-banner.jpg'
import ResearchPageComponent from '../_components/ResearchPageComponent'
import PublicBanners from '@/app/components/PublicBanners'

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
        {/* <ResearchBanner 
            title={bannerItems.title} 
            bannerImage={researchImage.src}
            description={bannerItems.description} />  */}
            <PublicBanners 
            title={bannerItems.title}
            message={bannerItems.description}
          />
            <ResearchPageComponent pageData={pageData} />
    </div>
  )
}

export default page