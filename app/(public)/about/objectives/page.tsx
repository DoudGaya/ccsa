import aboutBannerImage from "@/public/about-banner.jpg"
import { ArrowRight, Leaf, Cpu, Briefcase, FileText, Handshake } from "lucide-react"
import { AboutBanner } from "../_component/AboutBanner"
import Link from "next/link"
import Image from "next/image"
import { objectives } from "@/lib/items"
import PublicBanners from "@/app/components/PublicBanners"


const ObjectivesPage = () => {
  return (
    <div className="flex flex-col font-main items-center justify-center">
      <PublicBanners title='Our Objectives' message='Driving Innovation in Climate-Smart Agriculture' />
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold mb-4">Strategic Objectives</h1>
          <p className="text-lg max-w-3xl mx-auto text-gray-700">
            The Centre for Climate-Smart Agriculture (CCSA) is committed to advancing sustainable agricultural practices
            through five core strategic objectives that guide our research, innovation, and outreach efforts.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {objectives.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 flex flex-col"
            >
              <div className="relative h-48">
                {/* <Image
                  src={item.image || "/placeholder.svg?height=200&width=400"}
                  alt={item.title}
                  fill
                  className="object-cover"
                /> */}
                <div className="absolute inset-0 bg-brand/30 flex items-center justify-center">
                  <div className={`${item.color} p-4 rounded-full`}>{item.icon}</div>
                </div>
              </div>

              <div className="p-6 flex-grow">
                <h3 className={`text-xl font-bold mb-3 ${item.textColor}`}>{item.title}</h3>
                <p className="text-gray-700 mb-4">{item.description}</p>
              </div>

              <div className="px-6 pb-6">
              
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center bg-gray-50 p-8 rounded-xl">
          <h2 className="text-2xl font-bold mb-4">Join Our Mission</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            We invite researchers, farmers, policymakers, and industry partners to collaborate with us in advancing
            climate-smart agricultural practices for a more sustainable future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            {/* <Link
              href="/"
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-md transition duration-300"
            >
              Explore Our Research
            </Link> */}
            <Link
              href="/contact"
              className="bg-white border border-green-600 hover:bg-green-50 text-green-600 font-medium py-2 px-6 rounded-md transition duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ObjectivesPage

