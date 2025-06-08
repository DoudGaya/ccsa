"use client"

import { useState } from "react"
import Image from "next/image"
import { Globe, Calendar, Users, Award, ArrowRight, MapPin } from "lucide-react"
import student from '@/public/student.jpg'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
// import ApplicationModal from "@/components/ApplicationModal"
import Link from "next/link"

export default function ChinaProgramSection() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const highlights = [
    {
      icon: Globe,
      title: "International Exposure",
      description: "Study in China with world-class institutions",
    },
    {
      icon: Users,
      title: "Expert Training",
      description: "Learn from industry professionals and academics",
    },
    {
      icon: Award,
      title: "Recognized Certification",
      description: "Earn internationally recognized certificates",
    },
    {
      icon: MapPin,
      title: "Cultural Immersion",
      description: "Experience Chinese culture and language",
    },
  ]

  const institutions = [
    {
      name: "Changde Vocational Technical College",
      focus: "Climate-Smart Agriculture",
      specialization: "Irrigation systems and agricultural mechanization",
    },
    {
      name: "Hunan Mechanical and Electrical Polytechnic",
      focus: "Advanced Technologies",
      specialization: "Computer Science, Mechatronics, Robotics, IoT",
    },
    {
      name: "Yong Zhou Vocational Technical College",
      focus: "Health Sciences",
      specialization: "Nursing Science and Allied Health Disciplines",
    },
  ]

  return (
    <section className="py-24 bg-gradient-to-b from-blue-50 dark:from-blue-950/20 to-white dark:to-gray-950">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Globe className="h-4 w-4" />
            International Opportunity
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 to-brand bg-clip-text text-transparent">
           Unlock Global Opportunities!
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
            Join our International Capacity Development Program in collaboration with top Chinese institutions. Gain
            cutting-edge technical skills and cultural experience.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Badge variant="outline" className="text-lg px-4 py-2">
              September – December 2025
            </Badge>
            <Badge variant="outline" className="text-lg px-4 py-2">
              1 or 4 Month Options
            </Badge>
            <Badge variant="outline" className="text-lg px-4 py-2">
              All Students Welcome
            </Badge>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative h-[400px] w-full rounded-2xl overflow-hidden mb-16 shadow-2xl">
          <Image
            src={student.src}
            alt="China Program - Students in modern laboratory"
            fill
            className="object-cover bg-ble object-top "
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 via-brand/10 to-brand/80" />
          <div className="absolute inset-0 flex items-center justify-start">
            <div className="text-center text-brand bg-white/10 backdrop-blur-sm py-6 max-w-2xl px-8">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">Unlock Global Opportunities in China</h3>
              <p className="text-xl mb-6 text-black/90">
                Intensive capacity development program for technical, digital, and cultural skills
              </p>
              <div className=" grid grid-cols-2 gap-4">
             
              <Button size={'lg'} className="  bg-white border-brand border py-1 text-brand hover:bg-brand/10 font-semibold">
              <Link href={'/program'} className="flex items-center justify-center h-full w-full  ">
                  Learn More
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
