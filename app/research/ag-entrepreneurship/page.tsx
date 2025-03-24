import React from 'react'
import { ResearchBanner } from '../_components/ReasearchBanner'
import researchImage from '@/public/research-banner.jpg'
import ResearchPageComponent from '../_components/ResearchPageComponent'
import PublicBanners from '@/app/components/PublicBanners'


const bannerData =   {
    title: "Agri-Entrepreneurship",
    description:
      "Provide training and capacity-building programs for farmers, extension agents, and other stakeholders.",
    href: "/research/ag-entrepreneurship",
  }


  const pageData = {
    title: "Agri-Entrepreneurship",
    description:
      `
       CCSA CUA is committed to empowering farmers, extension agents, and other stakeholders through comprehensive
        training and capacity-building programs in agri-entrepreneurship.
      `,
      card: {
        title: "Our Programs",
        cards: [
          {
            title: "Agribusiness management and financial literacy",
            description:
              "Equip farmers with the skills to manage their operations efficiently and make informed financial decisions.",
          },
          {
            title: "Value chain development and market access strategies",
            description:
              "Help farmers identify market opportunities and develop strategies to access local and international markets.",
          },
          {
            title: "Sustainable farming techniques and best practices",
            description:
              "Promote sustainable farming practices that protect the environment and ensure the long-term viability of agricultural operations.",
          },
          {
            title: "Digital skills for agriculture",
            description:
              "Introduce farmers to digital tools and technologies that can enhance their productivity and efficiency.",
          },
          {
            title: "Leadership and communication in agricultural contexts",
            description:
              "Develop farmers' leadership and communication skills to help them engage with stakeholders and advocate for their interests.",
          },
        ]
      },
      cta: {
        title: "Join Our Next Training",
        description: " Enhance your agricultural skills and business acumen. Check our calendar for upcoming workshops and training sessions."
      }
  }




const page = async () => {
  return (
    <div>
        {/* <ResearchBanner 
            title={bannerData.title} 
            bannerImage={researchImage.src}
            description={bannerData.description}/>  */}
            <PublicBanners
            title={bannerData.title}
            message={bannerData.description}
          />
            <ResearchPageComponent pageData={pageData} />
    </div>
  )
}

export default page