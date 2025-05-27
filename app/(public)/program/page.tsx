"use client"

import { useState } from "react"
import Image from "next/image"
import { GraduationCap, Award, CheckCircle, Globe, Calendar } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ApplicationModal from "@/components/ApplicationModal"
import PublicBanners from "@/app/components/PublicBanners"
import programBanner from '@/public/student.jpg'

const pageData = {
  title: "International Capacity Development Program in China",
  description: "September – December 2025",
}

const programs = [
  {
    id: "AGRIC_TECH",
    title: "Agricultural Technology",
    description: "Master precision farming, IoT sensors and smart irrigation systems",
    duration: "6 months",
    level: "Intermediate to Advanced",
    features: ["Drone Technology", "Precision Farming", "IoT Integration", "Data Analytics"],
    color: "green",
  },
  {
    id: "HEALTH_TECH",
    title: "Health Technology",
    description: "Explore digital health solutions and medical technology innovations",
    duration: "4 months",
    level: "Beginner to Intermediate",
    features: ["Digital Health", "Medical Devices", "Health Analytics", "Telemedicine"],
    color: "blue",
  },
  {
    id: "ROBOTICS_INDUSTRIAL_AUTOMATION",
    title: "Robotics & Industrial Automation",
    description: "Learn robotics programming and industrial automation systems",
    duration: "8 months",
    level: "Advanced",
    features: ["Robot Programming", "Industrial Systems", "Automation", "Control Systems"],
    color: "purple",
  },
  {
    id: "AI_DATA_SCIENCE_ROBOTICS",
    title: "AI, Data Science & Robotics",
    description: "Comprehensive program combining AI, data science and robotics",
    duration: "12 months",
    level: "Advanced",
    features: ["Machine Learning", "Data Science", "AI Integration", "Robotics"],
    color: "orange",
  },
]

const chinaPrograms = [
  {
    id: "CHINA_CLIMATE_SMART_AGRICULTURE",
    title: "Climate-Smart Agriculture",
    institution: "Changde Vocational Technical College",
    description: "Focus on irrigation systems and agricultural mechanization",
    durations: [
      { id: "CHINA_CLIMATE_SMART_AGRICULTURE_1M", duration: "1 Month", dates: "September 1–28, 2025" },
      { id: "CHINA_CLIMATE_SMART_AGRICULTURE_4M", duration: "4 Months", dates: "September 1–December 23, 2025" },
    ],
    features: ["Irrigation Systems", "Agricultural Mechanization", "Climate-Smart Techniques", "Hands-on Training"],
    color: "green",
  },
  {
    id: "CHINA_ADVANCED_TECHNOLOGIES",
    title: "Advanced Technologies",
    institution: "Hunan Mechanical and Electrical Polytechnic, Changde",
    description:
      "Focus on Computer Science, Mechatronics, Robotics, CNC and PCB Manufacturing, IoT and Industrial Automation",
    durations: [
      { id: "CHINA_ADVANCED_TECHNOLOGIES_1M", duration: "1 Month", dates: "September 1–28, 2025" },
      { id: "CHINA_ADVANCED_TECHNOLOGIES_4M", duration: "4 Months", dates: "September 1–December 23, 2025" },
    ],
    features: ["Computer Science", "Mechatronics & Robotics", "CNC & PCB Manufacturing", "IoT & Industrial Automation"],
    color: "blue",
  },
  {
    id: "CHINA_HEALTH_SCIENCES",
    title: "Health Sciences",
    institution: "Yong Zhou Vocational Technical College",
    description: "Focus on Nursing Science and Allied Health Disciplines",
    durations: [
      { id: "CHINA_HEALTH_SCIENCES_1M", duration: "1 Month", dates: "September 1–28, 2025" },
      { id: "CHINA_HEALTH_SCIENCES_4M", duration: "4 Months", dates: "September 1–December 23, 2025" },
    ],
    features: ["Nursing Science", "Allied Health Disciplines", "Clinical Training", "Healthcare Innovation"],
    color: "purple",
  },
]

const importantDates = [
  { event: "Application Window", date: "May 1–14, 2025" },
  { event: "Payment Deadline", date: "May 28, 2025" },
  { event: "Visa Processing", date: "May 15–June 28, 2025" },
  { event: "Departure to China", date: "August 15–28, 2025" },
]



export default function ProgramsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div>
      <PublicBanners title={pageData.title} message={pageData.description} />

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Hero Section */}
        <section className="mb-16">
          {/* <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-gray-500 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
              Professional Development Programs
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Join our cutting-edge training programs designed to equip you with the skills needed for the future of
              technology and innovation, including international opportunities in China.
            </p>
          </div> */}

          {/* <div className="relative h-[400px] w-full rounded-xl overflow-hidden mb-12">
            <Image
              src={programBanner.src}
              alt="Professional Development Programs"
              fill
              className="object-cover object-top"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-brand/80 via-brand/50 to-transparent flex items-center">
              <div className="max-w-lg p-8">
                <h2 className="text-3xl font-bold text-white mb-4">Transform Your Career Globally</h2>
                <p className="text-white/90 text-lg mb-6">
                  Gain expertise in emerging technologies and advance your career with our comprehensive training
                  programs, including international opportunities in China.
                </p>
                <Button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-white text-blue-900 hover:bg-gray-100"
                  size="lg"
                >
                  Apply Now
                </Button>
              </div>
            </div>
            
          </div> */}
        </section>

        {/* Program Overview */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Why Choose Our Programs?</h2>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <GraduationCap className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">International Experience</h3>
              <p className="text-gray-600 dark:text-gray-400">
               Gain international work experience and technical expertise.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Globe className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Global Networking</h3>
              <p className="text-gray-600 dark:text-gray-400">Expand your global professional network.</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 dark:bg-purple-900/30 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Award className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Certification</h3>
              <p className="text-gray-600 dark:text-gray-400">Receive recognized certificates upon completion</p>
            </div>
          </div>
        </section>

           <div className="text-center mb-12">
                <div className="bg-gradient-to-r from-red-50 dark:from-red-900/20 to-yellow-50 dark:to-yellow-900/20 p-8 rounded-xl mb-8">
                  <h2 className="text-3xl font-bold mb-4">COSMOPOLITAN UNIVERSITY ABUJA</h2>
                  <p className="text-lg mb-4">In Collaboration with</p>
                  <p className="font-semibold mb-6">
                    Changde Vocational Technical College, Hunan Mechanical and Electrical Polytechnic and Yong Zhou
                    Vocational Technical College
                  </p>
                  <div className="border-t border-b border-gray-300 dark:border-gray-600 py-4 my-6">
                    <h3 className="text-2xl font-bold text-red-600 dark:text-red-400">PRESENTS</h3>
                    <h4 className="text-xl font-semibold mt-2">INTERNATIONAL CAPACITY DEVELOPMENT PROGRAM IN CHINA</h4>
                    <p className="text-lg font-medium mt-2">September – December 2025</p>
                  </div>
                  <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Unlock Global Opportunities!</h3>
                  <p className="text-lg mt-4 max-w-4xl mx-auto">
                    Join our intensive capacity development program designed for undergraduate and graduate students, as
                    well as professionals, to gain cutting-edge technical, digital and cultural skills in China.
                  </p>
                </div>
              </div>

        {/* Programs Tabs */}

        
        {/* Programs Grid */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Available Programs</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {programs.map((program) => (
              <Card
                key={program.id}
                className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <CardHeader
                  className={`bg-gradient-to-r ${
                    program.color === "green"
                      ? "from-green-500 to-green-700"
                      : program.color === "blue"
                        ? "from-blue-500 to-blue-700"
                        : program.color === "purple"
                          ? "from-purple-500 to-purple-700"
                          : "from-orange-500 to-orange-700"
                  } text-white`}
                >
                  <CardTitle className="text-xl">{program.title}</CardTitle>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="secondary" className="bg-white/20 text-white">
                      {program.duration}
                    </Badge>
                    <Badge variant="secondary" className="bg-white/20 text-white">
                      {program.level}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="p-6">
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{program.description}</p>

                  <div className="mb-6">
                    <h4 className="font-semibold mb-2">Key Features:</h4>
                    <ul className="space-y-1">
                      {program.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button onClick={() => setIsModalOpen(true)} className="w-full" variant="outline">
                    Apply for This Program
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Contact Sections */}
        
        <div className=" flex flex-col items-center justify-center bg-green-100 dark:bg-gray-900 p-8 rounded-xl mb-16">
          <h2 className="text-3xl font-bold mb-4">Contact Us for More Information</h2>
          <p className=" font-semibold text-lg text-green-950">Contact: ccsa@cosmopolitan.edu.ng</p>
        </div>


      
      </div>

      <ApplicationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}



// "use client"

// import { useState } from "react"
// import Image from "next/image"
// import { GraduationCap, Users, Award, CheckCircle } from "lucide-react"

// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import ApplicationModal from "@/components/ApplicationModal"
// import PublicBanners from "@/app/components/PublicBanners"

// const pageData = {
//   title: "Professional Development Programs",
//   description: "Advanced training programs in emerging technologies for agricultural innovation",
// }


// export default function ProgramsPage() {
//   const [isModalOpen, setIsModalOpen] = useState(false)

//   return (
//     <div>
//       <PublicBanners title={pageData.title} message={pageData.description} />

//       <div className="container mx-auto px-4 py-12 max-w-6xl">
//         {/* Hero Section */}
//         <section className="mb-16">
//           <div className="text-center mb-12">
//             <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-gray-500 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
//               Professional Development Programs
//             </h1>
//             <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
//               Join our cutting-edge training programs designed to equip you with the skills needed for the future of
//               technology and innovation.
//             </p>
//           </div>

//           <div className="relative h-[400px] w-full rounded-xl overflow-hidden mb-12">
//             <Image
//               src="/placeholder.svg?height=800&width=1200"
//               alt="Professional Development Programs"
//               fill
//               className="object-cover"
//               priority
//             />
//             <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-transparent flex items-center">
//               <div className="max-w-lg p-8">
//                 <h2 className="text-3xl font-bold text-white mb-4">Transform Your Career</h2>
//                 <p className="text-white/90 text-lg mb-6">
//                   Gain expertise in emerging technologies and advance your career with our comprehensive training
//                   programs.
//                 </p>
//                 <Button
//                   onClick={() => setIsModalOpen(true)}
//                   className="bg-white text-blue-900 hover:bg-gray-100"
//                   size="lg"
//                 >
//                   Apply Now
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Program Overview */}
//         <section className="mb-16">
//           <h2 className="text-3xl font-bold mb-8 text-center">Why Choose Our Programs?</h2>

//           <div className="grid md:grid-cols-3 gap-8 mb-12">
//             <div className="text-center">
//               <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
//                 <GraduationCap className="h-8 w-8 text-blue-600 dark:text-blue-400" />
//               </div>
//               <h3 className="text-xl font-semibold mb-2">Expert Instructors</h3>
//               <p className="text-gray-600 dark:text-gray-400">
//                 Learn from industry experts and experienced professionals
//               </p>
//             </div>

//             <div className="text-center">
//               <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
//                 <Users className="h-8 w-8 text-green-600 dark:text-green-400" />
//               </div>
//               <h3 className="text-xl font-semibold mb-2">Hands-on Learning</h3>
//               <p className="text-gray-600 dark:text-gray-400">Practical projects and real-world applications</p>
//             </div>

//             <div className="text-center">
//               <div className="bg-purple-100 dark:bg-purple-900/30 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
//                 <Award className="h-8 w-8 text-purple-600 dark:text-purple-400" />
//               </div>
//               <h3 className="text-xl font-semibold mb-2">Certification</h3>
//               <p className="text-gray-600 dark:text-gray-400">Receive recognized certificates upon completion</p>
//             </div>
//           </div>
//         </section>

//         {/* Call to Action */}
//         <section className="text-center bg-gradient-to-r from-blue-50 dark:from-gray-900 dark:to-slate-900 to-green-50 p-12 rounded-xl">
//           <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
//           <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
//             Join thousands of professionals who have advanced their careers through our comprehensive training programs.
//           </p>
//           <Button onClick={() => setIsModalOpen(true)} size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
//             Apply Now
//           </Button>
//         </section>
//       </div>

//       <ApplicationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
//     </div>
//   )
// }
