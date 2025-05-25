"use client"

import { useState } from "react"
import Image from "next/image"
import { Globe, Calendar, Users, Award, ArrowRight, MapPin } from "lucide-react"
import student from '@/public/student.jpg'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import ApplicationModal from "@/components/ApplicationModal"
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
            Study in China Program
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
                <Button
                onClick={() => setIsModalOpen(true)}
                size="lg"
                className="bg-brand text-white hover:bg-brand/90 font-semibold"
              >
                Apply Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
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

        {/* Program Highlights */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {highlights.map((highlight, index) => (
            <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="pt-8 pb-6">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <highlight.icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{highlight.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{highlight.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Partner Institutions */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-12">Partner Institutions in China</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {institutions.map((institution, index) => (
              <Card
                key={index}
                className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <CardHeader className="bg-gradient-to-r from-green-500 to-brand text-green-950">
                  <CardTitle className="text-lg">{institution.focus}</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">{institution.name}</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{institution.specialization}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Important Dates */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">Important Dates</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h4 className="font-semibold mb-1">Application Window</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">May 1–14, 2025</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h4 className="font-semibold mb-1">Payment Deadline</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">May 28, 2025</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h4 className="font-semibold mb-1">Visa Processing</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">May 15–June 28, 2025</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <h4 className="font-semibold mb-1">Program Start</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">September 1, 2025</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        {/* <div className="text-center bg-gradient-to-r from-green-600 to-brand-600 text-brand p-12 rounded-2xl shadow-2xl">
          <h3 className="text-3xl font-bold mb-4">Ready to Lead Your Future?</h3>
          <p className="text-xl mb-8 text-brand max-w-2xl mx-auto">
            Don't miss this opportunity to gain international experience, expand your network, and enhance your career
            prospects.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => setIsModalOpen(true)}
              size="lg"
              className="bg-white text-green-600 hover:bg-gray-100 font-semibold"
            >
              Apply Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white/10"
              onClick={() => window.open("mailto:ccsa@cosmopolitan.edu.ng")}
            >
              Contact Us
            </Button>
          </div>
          <p className="text-sm mt-6 text-white/80">
            COSMOPOLITAN UNIVERSITY ABUJA – Leading You to a World of Opportunities!
          </p>
        </div> */}
      </div>

      <ApplicationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  )
}
