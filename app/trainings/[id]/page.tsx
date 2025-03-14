import Image from "next/image"
import Link from "next/link"
import {
  Leaf,
  Cpu,
  Briefcase,
  FileText,
  Handshake,
  ArrowLeft,
  CheckCircle2,
  Users,
  BookOpen,
  Presentation,
} from "lucide-react"

// Training programs data
const trainingPrograms = [
  {
    id: "csap",
    title: "Certificate in Sustainable Agricultural Practices (CSAP)",
    mandate: "Sustainable Practice",
    mandateIcon: <Leaf className="h-5 w-5 text-green-600" />,
    mandateColor: "bg-green-100",
    textColor: "text-green-700",
    borderColor: "border-green-200",
    headerColor: "bg-green-600",
    image: "/images/sustainable-agriculture-training.jpg",
    overview:
      "This programme is designed to equip participants with the knowledge and skills necessary to implement sustainable agricultural practices across various platforms, including livestock, crops, poultry, and fishing. The programme focuses on maximising value, troubleshooting emerging pests and diseases, and enhancing soil health through agronomic practices and reduced dependence on chemical fertilisers.",
    learningOutcomes: [
      "Understand the principles of sustainable agriculture and their application across various agricultural platforms",
      "Develop skills in maximising value in agricultural production, including efficient use of resources and reduction of waste",
      "Learn to identify and manage emerging pests and diseases using integrated pest management (IPM) techniques",
      "Appreciate the importance of soil health and learn strategies for enhancing soil fertility and structure",
      "Develop knowledge of agronomic practices that promote sustainability, including conservation agriculture and agroforestry",
    ],
    curriculum: [
      "Introduction to Sustainable Agriculture",
      "Sustainable Livestock Production (dairy farming, beef, cattle and goats)",
      "Sustainable Crop Production (wheat, cassava, etc.)",
      "Sustainable Poultry and Fishing Practices",
      "Integrated Pest Management (IPM) and Disease Control",
      "Soil Health and Agronomic Practices for Sustainability",
    ],
    pedagogy: [
      "Expert-led workshops and field demonstrations",
      "Collaborative learning with Research Fellows, Technicians and Research Institutes",
      "Hands-on training and practical exercises",
      "Case studies and group discussions",
      "Short demonstration plots for experiential learning",
    ],
    targetAudience: [
      "Farmers and agricultural extension agents",
      "Agricultural researchers and academics",
      "Policymakers and development agencies",
      "Agricultural entrepreneurs and business owners",
      "Anyone interested in sustainable agriculture and environmental conservation",
    ],
  },
  {
    id: "etcra",
    title: "Certificate in Emerging Technologies for Climate-Resilient Agriculture (ETCRA)",
    mandate: "Emerging Technologies",
    mandateIcon: <Cpu className="h-5 w-5 text-blue-600" />,
    mandateColor: "bg-blue-100",
    textColor: "text-blue-700",
    borderColor: "border-blue-200",
    headerColor: "bg-blue-600",
    image: "/images/agritech-training.jpg",
    overview:
      "This programme explores the application of emerging technologies, including artificial intelligence (AI), machine learning (ML) and the Internet of Things (IoT), to enhance climate resilience in agriculture. Participants will discover how to harness these technologies to promote sustainable agricultural practices, boost efficiency and mitigate the impacts of climate change. Specifically, the programme will cover the application of predictive analytics, smart sensors and automation in farming to optimise crop yields, reduce waste and enhance decision-making.",
    learningOutcomes: [
      "Understand the role of AI and machine learning in climate-smart agricultural practices",
      "Develop skills in AI-driven crop and soil monitoring, predictive analytics, and automation in farming",
      "Design and implement strategies to mitigate the impacts of climate change on farming using emerging technologies",
      "Apply AI-powered solutions across various agricultural platforms, including livestock, crops, poultry, and fishing",
      "Utilise AI and machine learning to address real-time agricultural challenges",
      "Develop predictive models for yield estimation and risk assessment",
      "Enhance farming efficiency through AI-powered automation",
    ],
    curriculum: [
      "Introduction to Climate-Resilient Agriculture and Emerging Technologies",
      "AI and Machine Learning for Precision Farming and Climate Adaptation",
      "IoT and Smart Sensors in Precision Agriculture",
      "Sustainable Resource Management and AI-Powered Climate Forecasting",
      "Data Analytics for Sustainable Agriculture and Predictive Modelling",
      "Case Studies and Field Demonstrations of Emerging Technologies in Agriculture",
    ],
    pedagogy: [
      "Practical coding sessions for machine learning models",
      "Real-time AI applications in agriculture",
      "Group projects on AI-enabled farming solutions",
      "Case studies on climate-resilient farming",
      "Hands-on training with AI modelling tools",
      "Field demonstrations on AI-assisted soil monitoring",
      "Collaborative learning with experts from research institutes and industry",
    ],
    targetAudience: [
      "Agronomists, environmental scientists, and farmers",
      "Policymakers in sustainable agriculture and emerging technologies",
      "AI and data science professionals interested in agritech",
      "Agricultural researchers and tech innovators",
      "Agricultural extension agents and educators",
    ],
  },
  {
    id: "apc",
    title: "Agribusiness Proficiency Course",
    mandate: "Agri-Entrepreneurship",
    mandateIcon: <Briefcase className="h-5 w-5 text-amber-600" />,
    mandateColor: "bg-amber-100",
    textColor: "text-amber-700",
    borderColor: "border-amber-200",
    headerColor: "bg-amber-600",
    image: "/images/agribusiness-training.jpg",
    overview:
      "This programme equips participants with essential skills to establish and manage profitable agribusiness ventures, with a strong focus on farm management. Effective farm management is critical to success in agribusiness, as research has shown that lack of knowledge in this area can lead to poor performance and reduced profitability.",
    learningOutcomes: [
      "Learn to develop agribusiness models for different markets",
      "Understand financial management and funding opportunities",
      "Explore innovative marketing strategies for agricultural products",
      "Develop essential farm management skills, including crop and livestock management, farm operations and logistics, and risk management and mitigation strategies",
    ],
    curriculum: [
      "Introduction to Agribusiness Management",
      "Financial Planning and Investment in Agribusiness",
      "Sustainable Supply Chain Management",
      "Marketing and Branding in Agri-Entrepreneurship",
      "Farm Management Essentials",
      "Case Studies of Successful Agribusiness Ventures",
    ],
    pedagogy: [
      "Business simulations and case studies",
      "Expert-led workshops and industry mentorship",
      "Group projects on innovative agribusiness solutions",
    ],
    targetAudience: [
      "Aspiring agripreneurs and business owners",
      "Investors and stakeholders in agribusiness",
      "Development agencies supporting agriculture-based SMEs",
      "Farm managers and agricultural professionals seeking to improve their business skills",
    ],
  },
  {
    id: "csapa",
    title: "Certificate in Climate-Smart Agriculture Policy and Advocacy (CSAPA)",
    mandate: "Policy and Advocacy",
    mandateIcon: <FileText className="h-5 w-5 text-purple-600" />,
    mandateColor: "bg-purple-100",
    textColor: "text-purple-700",
    borderColor: "border-purple-200",
    headerColor: "bg-purple-600",
    image: "/images/policy-advocacy-training.jpg",
    overview:
      "This programme explores the intersection of policy, sustainability, and climate-smart agriculture. Participants will gain knowledge and skills to drive policy change, advocate for sustainable practices, and promote climate-resilient agriculture.",
    learningOutcomes: [
      "Analyse the role of policy in shaping sustainable agricultural practices",
      "Develop advocacy skills for climate-smart agricultural policies at national and global levels",
      "Understand the ethical considerations in policy-making for sustainable agriculture",
      "Design and implement policy solutions for climate-resilient agriculture",
    ],
    curriculum: [
      "Policy-Making for Sustainable Agriculture",
      "Sustainable Agriculture Regulations and Compliance",
      "International Policies on Climate Adaptation",
      "Ethical Considerations in Agricultural Policy",
      "Policy Advocacy for Climate-Resilient Agriculture",
    ],
    pedagogy: [
      "Policy analysis workshops",
      "Expert guest lectures on sustainable agriculture",
      "Group discussions on real-world policy challenges",
      "Case studies and scenario planning",
    ],
    targetAudience: [
      "Government officials and policymakers",
      "Agricultural economists and sustainability advocates",
      "Professionals interested in policy formulation for sustainable agriculture",
      "Group discussions on real-world policy challenges",
    ],
  },
  {
    id: "csap-partnerships",
    title: "Certificate in Climate-Smart Agriculture Partnerships (CSAP)",
    mandate: "Partnerships",
    mandateIcon: <Handshake className="h-5 w-5 text-teal-600" />,
    mandateColor: "bg-teal-100",
    textColor: "text-teal-700",
    borderColor: "border-teal-200",
    headerColor: "bg-teal-600",
    image: "/images/partnerships-training.jpg",
    overview:
      "This programme fosters collaboration between agricultural experts, policymakers, and private-sector stakeholders. Participants will gain knowledge and skills to develop partnerships for climate-resilient agriculture.",
    learningOutcomes: [
      "Understand the importance of partnerships in promoting climate-resilient agriculture",
      "Develop skills in building and maintaining partnerships for sustainable agriculture",
      "Analyse the role of private sector stakeholders in promoting climate-resilient agriculture",
      "Design and implement partnership strategies for climate-resilient agriculture",
    ],
    curriculum: [
      "Partnerships for Sustainable Agriculture",
      "Public-Private Partnerships in Agri-Tech",
      "Global Collaboration in Climate-Smart Agriculture",
      "Building and Maintaining Partnerships for Sustainable Agriculture",
      "Partnership Strategies for Climate-Resilient Agriculture",
    ],
    pedagogy: [
      "Cross-sector collaborative workshops",
      "Networking sessions with industry leaders",
      "Case studies and group projects",
      "Expert guest lectures on partnerships for sustainable agriculture",
    ],
    targetAudience: [
      "Agricultural policymakers and researchers",
      "Private sector companies in agri-tech and agriculture",
      "International development organisations",
      "Professionals interested in partnerships for sustainable agriculture",
    ],
  },
]

export default function TrainingProgramPage({ params }: { params: { id: string } }) {
  const program = trainingPrograms.find((p) => p.id === params.id)

  if (!program) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-6">Training Program Not Found</h1>
        <p className="mb-6">The training program you're looking for doesn't exist.</p>
        <Link href="/training" className="text-blue-600 hover:text-blue-800 font-medium">
          Return to Training Programs
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <Link href="/training" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to All Training Programs
      </Link>

      {/* Header */}
      <div className={`${program.headerColor} text-white p-6 rounded-t-lg`}>
        <div className={`inline-flex items-center ${program.mandateColor} px-3 py-1 rounded-full mb-3`}>
          {program.mandateIcon}
          <span className={`ml-2 text-sm font-medium ${program.textColor}`}>{program.mandate}</span>
        </div>
        <h1 className="text-3xl font-bold mb-2">{program.title}</h1>
      </div>

      {/* Hero Image */}
      <div className="mb-8">
        <Image
          src={program.image || "/placeholder.svg"}
          alt={program.title}
          width={1000}
          height={500}
          className="w-full object-cover h-80"
        />
      </div>

      {/* Overview */}
      <section className={`mb-8 p-6 rounded-lg border ${program.borderColor}`}>
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <BookOpen className="h-6 w-6 mr-2 text-gray-700" />
          Overview
        </h2>
        <p>{program.overview}</p>
      </section>

      {/* Learning Outcomes */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <CheckCircle2 className="h-6 w-6 mr-2 text-gray-700" />
          Learning Outcomes
        </h2>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <p className="mb-4">Upon completing the programme, participants will:</p>
          <ul className="space-y-2">
            {program.learningOutcomes.map((outcome, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle2 className="h-5 w-5 mr-2 text-green-600 mt-0.5 flex-shrink-0" />
                <span>{outcome}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Curriculum */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <BookOpen className="h-6 w-6 mr-2 text-gray-700" />
          Curriculum
        </h2>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <ol className="list-decimal pl-5 space-y-2">
            {program.curriculum.map((item, index) => (
              <li key={index} className="pl-2">
                {item}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Pedagogy */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <Presentation className="h-6 w-6 mr-2 text-gray-700" />
          Pedagogy
        </h2>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <ul className="list-disc pl-5 space-y-2">
            {program.pedagogy.map((item, index) => (
              <li key={index} className="pl-2">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Target Audience */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <Users className="h-6 w-6 mr-2 text-gray-700" />
          Target Audience
        </h2>
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <ul className="list-disc pl-5 space-y-2">
            {program.targetAudience.map((item, index) => (
              <li key={index} className="pl-2">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Application */}
      <section className={`${program.mandateColor} p-6 rounded-lg mb-8`}>
        <h2 className={`text-xl font-semibold mb-4 ${program.textColor}`}>Ready to Apply?</h2>
        <p className="mb-6">
          Join our {program.title} programme to gain the knowledge and skills needed to implement climate-smart
          agricultural practices and drive sustainable change.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            className={`${program.headerColor} hover:bg-opacity-90 text-white font-medium py-2 px-6 rounded-md transition duration-300`}
          >
            Apply Now
          </button>
          <button
            className={`bg-white border ${program.borderColor} hover:bg-opacity-90 ${program.textColor} font-medium py-2 px-6 rounded-md transition duration-300`}
          >
            Download Brochure
          </button>
        </div>
      </section>

      {/* Related Programs */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-6">Related Programs</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {trainingPrograms
            .filter((p) => p.id !== program.id)
            .slice(0, 2)
            .map((relatedProgram) => (
              <div
                key={relatedProgram.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200"
              >
                <div className="h-40 relative">
                  <Image
                    src={relatedProgram.image || "/placeholder.svg"}
                    alt={relatedProgram.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <div
                    className={`inline-flex items-center ${relatedProgram.mandateColor} px-3 py-1 rounded-full mb-2`}
                  >
                    {relatedProgram.mandateIcon}
                    <span className={`ml-2 text-xs font-medium ${relatedProgram.textColor}`}>
                      {relatedProgram.mandate}
                    </span>
                  </div>
                  <h3 className="font-semibold mb-2 line-clamp-2">{relatedProgram.title}</h3>
                  <Link
                    href={`/training/${relatedProgram.id}`}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </section>
    </div>
  )
}


// import PublicBanners from '@/app/components/PublicBanners'
// import { getSingleTraining } from '@/sanity/lib/quesries/trainingQueries'
// import { CalendarIcon, MapPinIcon } from 'lucide-react'
// import React from 'react'
// import { SanityTypes } from '@/@types'
// import { PortableText } from 'next-sanity'

// type PageProps = {
//   slug: string
// }

// const page = async ( {params}: {params: Promise<PageProps>} ) => {

//   const { slug } = await params
//   console.log(slug)

//   const sameDay = true; // Replace with actual logic
//   const formattedStartDate = '2023-01-01'; // Replace with actual logic
//   const formattedEndDate = '2023-01-02'; // Replace with actual logic
//   console.log(slug)




//   const training = await getSingleTraining(slug) as SanityTypes.Trainings


//   return (
//     <div>
//       <PublicBanners 
//       title='Trainings'
//       message='We offer a variety of training programs in the Center for Climate-Smart Agriculture, Cosmopolitan University Abuja.'
//       />
//       <div className=" flex flex-col space-y-8">
//         <div className="container font-main font-semibold mx-auto px-10 py-10">
//           <div className="max-w-4xl mx-auto">
//             <h1 className="text-4xl font-bold font-main mb-6">{training.title}</h1>
//             <div className=" bg-green-200/50 rounded-lg p-6 mb-8">
//               <div className="grid gap-4 sm:grid-cols-2">
//                 <div className="flex items-center">
//                   <CalendarIcon className="mr-3 h-5 w-5 text-muted-foreground" />
//                   <div>
//                     <p className="text-sm text-muted-foreground">Date</p>
//                     <p className="font-medium">
//                       {sameDay ? formattedStartDate : `${formattedStartDate} - ${formattedEndDate}`}
//                     </p>
//                   </div>
//                 </div>
//                 <div className="flex space-y-3 items-start flex-col">
//                   <div className=" flex space-x-2">
//                     <MapPinIcon className=" h-5 w-5 text-muted-foreground" />
//                     <p className="text-sm text-muted-foreground">Location</p>
//                   </div>
//                   <div>
//                     <p className="font-medium text-sm">
//                       {training.location} | {training.venue}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <article className=" prose lg:prose-lg dark:prose-invert font-main w-full max-w-4xl mx-auto text-lg space-y-6">
//           <PortableText 
//           // @ts-ignore
//           value={training.description} />
//         </article>
//         </div>

        
//       </div>
//     </div>
//   )
// }
 
// export default page