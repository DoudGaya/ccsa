import React from 'react'
import { ResearchBanner } from '../_components/ReasearchBanner'
import researchImage from '@/public/research-banner.jpg'
import ResearchPageComponent from '../_components/ResearchPageComponent'
import PublicBanners from '@/app/components/PublicBanners'

const page = async () => {


    const bannerData =  {
        title: "Sustainable Practice",
        description:
          "Sustainably Advance Climate-Smart Agricultural Practices for Enhanced Food and Nutrition Security.",
        href: "/research/climate-smart-agriculture",
      }

      const pageData = {
        title: "Sustainable Practice: Climate-Smart Agriculture",
        description:
          `
          At the Center for Climate-Smart Agriculture, Cosmopolitan University Abuja (CCSA CUA), we are dedicated to
          advancing sustainable agricultural practices that enhance food and nutrition security while mitigating the
          impacts of climate change.
          `,
          card: {
            title: "Our Approach",
            cards: [
              {
                title: "Developing and implementing climate-resilient crop varieties",
                description: "Promote the adoption of crop varieties that are resilient to climate variability and extreme weather events."
              },
              {
                title: "Promoting water-efficient irrigation systems",
                description: "Encourage the use of water-efficient irrigation systems to reduce water waste and improve crop yields."
              },
              {
                title: "Encouraging soil conservation and management techniques",
                description: "Promote soil conservation and management practices to enhance soil health and fertility."
              },
              {
                title: "Integrating agroforestry practices",
                description: "Integrate agroforestry practices to enhance biodiversity, improve soil structure, and sequester carbon."
              },
              {
                title: "Advancing sustainable livestock management",
                description: "Promote sustainable livestock management practices that reduce greenhouse gas emissions and improve animal welfare."
              }
            ]
          },
          cta: {
            title: "Get Involved",
            description: "Join us in our mission to create a more sustainable and food-secure future. Contact us to learn about our programs and how you can contribute."
          }
      }
    


  return (
    <div>
        {/* <ResearchBanner 
            title={pageData.title} 
            bannerImage={researchImage.src}
            description={pageData.description} />  */}

            <PublicBanners
            title={bannerData.title}
            message={bannerData.description}
          />
            <ResearchPageComponent pageData={pageData} />
    </div>
  )
}

export default page