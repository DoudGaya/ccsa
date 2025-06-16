"use client"

import { useState } from "react"
import { Calendar, CheckCircle, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import ApplicationModal from "@/components/ApplicationModal"
// import ProgramApplicationForm from "@/components/ProgramApplicationForm"
import ProgramApplicationForm from "@/components/ProgramApplicationForm"
import PublicBanners from "@/app/components/PublicBanners"
import Link from "next/link"

const pageData = {
  title: "International Capacity Development Program in China",
  description: "September – December 2025",
}

const programFocusAreas = [
  {
    title: "Bridging the Technical and Digital Skills Gap",
    description: "Hands-on technical training in high-demand industries",
  },
  {
    title: "Industrial Placement and Technical Tours",
    description: "Experience real-world operations across top companies and industries",
  },
  {
    title: "Learn Basic Chinese Language (Mandarin) and Explore Chinese Culture",
    description: "Build your global communication skills",
  },
  {
    title: "Business Opportunities in China",
    description: "Participate in high-impact seminars on entrepreneurship and investment opportunities",
  },
]

const specializedInstitutions = [
  {
    name: "Changde Vocational Technical College",
    focus: "Climate-Smart Agriculture",
    description: "Focus on irrigation systems and agricultural mechanization.",
  },
  {
    name: "Hunan Mechanical and Electrical Polytechnic, Changde",
    focus: "Advanced Technologies",
    description:
      "Focus on Computer Science, Mechatronics, Robotics, CNC and PCB Manufacturing, Internet of Things (IoT), and Industrial Automation.",
  },
  {
    name: "Yong Zhou Vocational Technical College",
    focus: "Health Sciences",
    description: "Focus on Nursing Science and Allied Health Disciplines.",
  },
]

const importantDates = [
  { event: "Application Window", date: "May 1–14, 2025" },
  { event: "Payment Deadline", date: "May 28, 2025" },
  { event: "Visa Processing", date: "May 15–June 28, 2025" },
  { event: "Departure to China", date: "August 15–28, 2025" },
]

const programDurations = [
  { duration: "1 Month Program", dates: "September 1–28, 2025" },
  { duration: "4 Month Program", dates: "September 1–December 23, 2025" },
]

const whyApplyReasons = [
  "Gain international work experience and technical expertise.",
  "Expand your global professional network.",
  "Enhance your CV with recognised international exposure.",
  "Explore new cultures and languages.",
  "Discover business and career opportunities in China.",
]

export default function ProgramsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div>
      <PublicBanners title={pageData.title} message={pageData.description} />

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* University Header */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <div className="bg-gradient-to-r from-red-50 dark:from-red-900/20 to-yellow-50 dark:to-yellow-900/20 p-8 rounded-xl">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">COSMOPOLITAN UNIVERSITY ABUJA</h1>

              <div className="my-6">
                <p className="text-lg mb-4">In Collaboration with</p>
                <p className="font-semibold text-lg">
                  Changde Vocational Technical College, Hunan Mechanical and Electrical Polytechnic, and Yong Zhou
                  Vocational Technical College
                </p>
              </div>

              <div className="border-t border-b border-gray-300 dark:border-gray-600 py-6 my-8">
                <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-2">PRESENTS</h2>
                <h3 className="text-xl md:text-2xl font-bold mb-2">
                  INTERNATIONAL CAPACITY DEVELOPMENT PROGRAM IN CHINA
                </h3>
                <p className="text-lg font-medium">September – December 2025</p>
              </div>

              <h3 className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-4">
                Unlock Global Opportunities!
              </h3>
              <p className="text-lg max-w-4xl mx-auto">
                Join our intensive capacity development program designed for undergraduate and graduate students, as
                well as professionals, to gain cutting-edge technical, digital, and cultural skills in China.
              </p>
            </div>
          </div>
        </section>

        {/* Tabs for Program Info and Application */}
        <Tabs defaultValue="program-info" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="program-info">Program Information</TabsTrigger>
            <TabsTrigger className=" bg-brand text-white font-semibold" value="application">Apply Now</TabsTrigger>
          </TabsList>

          <TabsContent value="program-info" className="space-y-16">
            {/* Program Focus Areas */}
            <section>
              <h2 className="text-2xl font-bold mb-8 text-center border-b pb-4">Program Focus Areas:</h2>
              <div className="space-y-6">
                {programFocusAreas.map((area, index) => (
                  <Card key={index} className="p-6">
                    <h3 className="text-lg font-semibold mb-2">{area.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">({area.description})</p>
                  </Card>
                ))}
              </div>
            </section>

            {/* Specialized Learning Institutions */}
            <section>
              <h2 className="text-2xl font-bold mb-8 text-center border-b pb-4">specialised Learning Institutions:</h2>
              <div className="space-y-6">
                {specializedInstitutions.map((institution, index) => (
                  <Card key={index} className="p-6">
                    <h3 className="text-lg font-semibold mb-2">{institution.name}</h3>
                    <h4 className="text-md font-medium text-blue-600 dark:text-blue-400 mb-2">{institution.focus}:</h4>
                    <p className="text-gray-600 dark:text-gray-400">{institution.description}</p>
                  </Card>
                ))}
              </div>
            </section>

            {/* Program Duration and Fees */}
            <section>
              <h2 className="text-2xl font-bold mb-8 text-center border-b pb-4">Program Duration and Fees:</h2>
              <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl text-center">
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  Detailed fee structure and payment information will be provided upon application.
                </p>
              </div>
            </section>

            {/* Important Dates */}
            <section>
              <h2 className="text-2xl font-bold mb-8 text-center border-b pb-4">Important Dates to Remember:</h2>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                {importantDates.map((item, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-3" />
                        <span className="font-semibold">{item.event}:</span>
                      </div>
                      <Badge variant="outline">{item.date}</Badge>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Program Start:</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {programDurations.map((program, index) => (
                    <Card key={index} className="p-4">
                      <div className="text-center">
                        <h4 className="font-semibold mb-2">{program.duration}</h4>
                        <p className="text-gray-600 dark:text-gray-400">{program.dates}</p>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </section>

            {/* Why You Should Apply */}
            <section>
              <h2 className="text-2xl font-bold mb-8 text-center border-b pb-4">Why You Should Apply:</h2>
              <div className="space-y-4">
                {whyApplyReasons.map((reason, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700 dark:text-gray-300">{reason}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Ready to Lead Your Future */}
            <section>
              <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-8 rounded-xl text-center">
                <h2 className="text-2xl font-bold mb-4 border-b border-white/20 pb-4">Ready to Lead Your Future?</h2>
                <p className="text-lg mb-6">For inquiries and applications, please contact:</p>
                <div className="flex items-center justify-center mb-6">
                  <Mail className="h-5 w-5 mr-2" />
                  <span className="text-lg font-semibold">Email: ccsa@cosmopolitan.edu.ng</span>
                </div>
                <Button
                  // onClick={() => setIsModalOpen(true)}
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100 font-semibold"
                >
                  <Link href={'/contact'}>Contact Us</Link>
                </Button>
              </div>
            </section>

            {/* Footer */}
            <section className="text-center">
              <div className="border-t border-gray-300 dark:border-gray-600 pt-8">
                <p className="text-xl font-bold text-gray-800 dark:text-gray-200">
                  COSMOPOLITAN UNIVERSITY ABUJA – Leading You to a World of Opportunities!
                </p>
              </div>
            </section>
          </TabsContent>

          <TabsContent value="application">
            <div className="py-8">
              <ProgramApplicationForm />
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* <ApplicationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} /> */}
    </div>
  )
}

