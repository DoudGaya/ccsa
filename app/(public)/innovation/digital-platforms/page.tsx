import React from 'react'
import { InnovationBanner } from '../_components/InnovationBanner'
import innovationBannerImmage from '@/public/innovation-banner.jpg'
import Image from "next/image"
import aiImage from '@/public/AI.png'
import analytics from '@/public/analytics.jpg'
import marketPlace from '@/public/market-place.jpg'
import Link from "next/link"
import {
  Database,
  Users,
  BookOpen,
  ShoppingCart,
  BarChart3,
  ArrowRight,
  Smartphone,
  Cloud,
  BrickWall,
  Leaf,
  MapPin,
  ChartArea,
  ChartCandlestick,
  Dice4Icon,
  FileVolume,
  Globe,
  Server,
  Cpu,
  MapIcon,
  TabletSmartphone,
} from "lucide-react"
import PublicBanners from '@/app/components/PublicBanners'


const pageData = {
    title: "Digital Platforms",
    description:
      "We have state-of-the-art Digital Platforms",
    href: "/media/interviews",
  }

const page = () => {
  return (
    <div>
      <PublicBanners title={pageData.title} message={pageData.description} />
        {/* <InnovationBanner 
        bannerImage={innovationBannerImmage.src}
        description={pageData.description}
        title={pageData.title}
        /> */}

<div className="container mx-auto px-4 py-8 max-w-5xl">
      <h1 className="text-3xl font-bold mb-2 text-center">CCSA Digital Platforms</h1>
      <h2 className="text-xl font-medium mb-8 text-center text-blue-600">
        Transforming Agriculture Through Technologies
      </h2>
      {/* Introduction */}
      <section className="mb-12">
        <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg border border-blue-100">
          <p className="mb-4">
            At the Centre for Climate-Smart Agriculture (CCSA), we are working with diverse stakeholders, including soil
            scientists, fertiliser experts, pest management specialists, seed technologists, remote sensing specialists,
            software developers, AI engineers, agronomists, climate scientists and policy experts, innovation hubs and
            startups, to develop innovative digital platforms that enhance sustainable farming practices.
          </p>
          <p className="mb-4">
            These platforms are designed to reduce input costs such as water, fertilisers and chemicals for plant and
            animal disease management while improving yield, productivity and resilience. By leveraging advanced
            technologies, we aim to accelerate agroecology and regenerative agricultural practices, ensuring a
            sustainable and climate-resilient food system.
          </p>
          <p>
            As part of our mission, we continue to develop, test and evaluate cutting-edge digital solutions, ensuring
            they remain effective, accessible and aligned with the evolving needs of the agricultural sector. These
            platforms, detailed further on our Activities page, focus on key areas essential to modernising agriculture
            and improving sustainability.
          </p>
        </div>
      </section>

      {/* Key Digital Platforms */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-8 text-center">Key Digital Platforms</h2>

        {/* Platform 1 */}
        <div className="mb-12 bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
          <div className="bg-blue-600 text-white p-4 flex items-center">
            <Database className="h-6 w-6 mr-3" />
            <h3 className="text-xl font-semibold">1. Farmer Information & Cooperative Management Systems</h3>
          </div>

          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex">
                <div className="bg-blue-100 p-2 rounded-full h-10 w-10 flex items-center justify-center mr-4 flex-shrink-0">
                  <Server className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Centralised Farmer & Farm Database</h4>
                  <p className="text-sm">A digital repository for farmer profiles, land data and crop history.</p>
                </div>
              </div>

              <div className="flex">
                <div className="bg-blue-100 p-2 rounded-full h-10 w-10 flex items-center justify-center mr-4 flex-shrink-0">
                 <MapIcon className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold mb-2">GIS Mapping for Precision Agriculture</h4>
                  <p className="text-sm">
                    Integration of Geographic Information Systems (GIS) for soil quality mapping, farm locations and
                    climate data.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="bg-blue-100 p-2 rounded-full h-10 w-10 flex items-center justify-center mr-4 flex-shrink-0">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Farmer Cooperative Management and Clustering</h4>
                  <p className="text-sm">
                    Digital tools to organise farmers by crop type, location, land size and farming season (dry/wet).
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="bg-blue-100 p-2 rounded-full h-10 w-10 flex items-center justify-center mr-4 flex-shrink-0">
                  <Smartphone className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Integrated Communication Channels</h4>
                  <p className="text-sm">
                    SMS, USSD, IVR, email and web-based platforms for seamless interaction between farmers,
                    cooperatives, governments and service providers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Platform 2 */}
        <div className="mb-12 bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
          <div className="bg-green-600 text-white p-4 flex items-center">
            <BookOpen className="h-6 w-6 mr-3" />
            <h3 className="text-xl font-semibold">2. Agricultural Extension & Advisory Services</h3>
          </div>

          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex">
                <div className="bg-green-100 p-2 rounded-full h-10 w-10 flex items-center justify-center mr-4 flex-shrink-0">
                  <Cloud className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Web & Mobile-Based Knowledge Hubs</h4>
                  <p className="text-sm">
                    Providing real-time expert advice, pest and disease management, weather forecasts, soil analysis and
                    good agronomic practices.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="bg-green-100 p-2 rounded-full h-10 w-10 flex items-center justify-center mr-4 flex-shrink-0">
                  <Smartphone className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Interactive Digital Advisory Hub</h4>
                  <p className="text-sm">
                    An IVR Farmer Helpline and USSD-based support system for direct farmer engagement.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="bg-green-100 p-2 rounded-full h-10 w-10 flex items-center justify-center mr-4 flex-shrink-0">
                 <BrickWall className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Mechanisation & Value Chain Management</h4>
                  <p className="text-sm">
                    Digital tools to streamline farm business management, post-harvest handling and access to
                    mechanisation services.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="bg-green-100 p-2 rounded-full h-10 w-10 flex items-center justify-center mr-4 flex-shrink-0">
                  <FileVolume className="h-5 w-5 text-green-600" />
                 
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Audio-Visual Content Production</h4>
                  <p className="text-sm">Developing multimedia resources on emerging agricultural issues.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Platform 3 */}
        <div className="mb-12 bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
          <div className="bg-amber-600 text-white p-4 flex items-center">
            <ShoppingCart className="h-6 w-6 mr-3" />
            <h3 className="text-xl font-semibold">3. Market Access, Commodity Trading & Climate Information Systems</h3>
          </div>

          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex">
                <div className="bg-amber-100 p-2 rounded-full h-10 w-10 flex items-center justify-center mr-4 flex-shrink-0">
                  <BarChart3 className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Real-Time Market & Price Information</h4>
                  <p className="text-sm">
                    A digital platform offering farmers insights on market prices, demand trends and buyer locations.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="bg-amber-100 p-2 rounded-full h-10 w-10 flex items-center justify-center mr-4 flex-shrink-0">
                  <ShoppingCart className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Direct-to-Buyer Trading Platforms</h4>
                  <p className="text-sm">Enabling farmers to sell their produce seamlessly and securely.</p>
                </div>
              </div>

              <div className="flex">
                <div className="bg-amber-100 p-2 rounded-full h-10 w-10 flex items-center justify-center mr-4 flex-shrink-0">
                  <Cloud className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Climate Information & Advisory System</h4>
                  <p className="text-sm">
                    Providing weather forecasts, climate adaptation strategies and yield prediction tools to help
                    farmers make informed decisions.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="bg-amber-100 p-2 rounded-full h-10 w-10 flex items-center justify-center mr-4 flex-shrink-0">
                 <ChartCandlestick className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Commodity Exchange Platform</h4>
                  <p className="text-sm">
                    A secure digital marketplace that facilitates transparent transactions and integrates secure payment
                    and contract management systems.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Platform 4 */}
        <div className="mb-12 bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
          <div className="bg-purple-600 text-white p-4 flex items-center">
            <BarChart3 className="h-6 w-6 mr-3" />
            <h3 className="text-xl font-semibold">4. Farm Management & Monitoring Systems</h3>
          </div>

          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex">
                <div className="bg-purple-100 p-2 rounded-full h-10 w-10 flex items-center justify-center mr-4 flex-shrink-0">
                  <TabletSmartphone className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Smart Farm Management Tools</h4>
                  <p className="text-sm">
                    Offering crop planning, input management and harvest tracking with data-driven recommendations.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="bg-purple-100 p-2 rounded-full h-10 w-10 flex items-center justify-center mr-4 flex-shrink-0">
                  <Users className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Extension Administration System</h4>
                  <p className="text-sm">
                    A performance tracking and resource allocation platform for agricultural extension agents.
                  </p>
                </div>
              </div>

              <div className="flex md:col-span-2">
               <div className=" flex">
               <div className="bg-purple-100 p-2 rounded-full h-10 w-10 flex items-center justify-center mr-4 flex-shrink-0">
                  <BarChart3 className="h-5 w-5 text-purple-600" />
                </div>
               </div>
                <div>
                  <h4 className="font-semibold mb-2">Monitoring & Evaluation (M&E) for Agriculture</h4>
                  <p className="text-sm">
                    A data analytics-driven system to assess agricultural policies, track project impacts and optimise
                    resource allocation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

       {/* Platform 5 */}
       <div className="mb-12 bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
          <div className="bg-indigo-600 text-white p-4 flex items-center">
            <Cpu className="h-5 w-5 mr-3" />
            <h3 className="text-xl font-semibold">5. AI Farming Assistant</h3>
          </div>
          
          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex">
              <div className="bg-purple-100 p-2 rounded-full h-10 w-10 flex items-center justify-center mr-4 flex-shrink-0">
                  <Globe className="h-5 w-5 text-purple-600" />
                </div>
    
                <div>
                  <h4 className="font-semibold mb-2">Multilingual Support</h4>
                  <p className="text-sm">Advanced AI assistant that understands and responds in Nigerian local languages, making agricultural knowledge accessible to all farmers regardless of language barriers.</p>
                </div>
              </div>
              
              <div className="flex">
                <div className="bg-purple-100 p-2 rounded-full h-10 w-10 flex items-center justify-center mr-4 flex-shrink-0">
                  <Dice4Icon className="h-5 w-5 text-purple-600" />
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Soil Analysis & Crop Recommendation</h4>
                  <p className="text-sm">Analyzes soil samples to determine nutrient content, pH levels, and other properties, then recommends optimal crops for specific land conditions.</p>
                </div>
              </div>
              
              <div className="flex">

                <div className="bg-purple-100 p-2 rounded-full h-10 w-10 flex items-center justify-center mr-4 flex-shrink-0">
                  <MapPin className="h-5 w-5 text-purple-600" />
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Precision Irrigation Planning</h4>
                  <p className="text-sm">Provides customized watering schedules based on crop type, soil conditions, weather forecasts, and local climate patterns to optimize water usage.</p>
                </div>
              </div>
              
              <div className="flex">
              <div className="bg-purple-100 p-2 rounded-full h-10 w-10 flex items-center justify-center mr-4 flex-shrink-0">
                  <ChartArea className="h-5 w-5 text-purple-600" />
                </div>
               
                <div>
                  <h4 className="font-semibold mb-2">Fertilizer Recommendations</h4>
                  <p className="text-sm">Delivers precise fertilizer recommendations including type, quantity, and application timing based on soil needs and crop requirements.</p>
                </div>
              </div>
              
              <div className="flex md:col-span-2">
              <div className="bg-purple-100 p-2 rounded-full h-10 w-10 flex items-center justify-center mr-4 flex-shrink-0">
                  <Leaf className="h-5 w-5 text-purple-600" />
                </div>
               
                <div>
                  <h4 className="font-semibold mb-2">Plant Disease & Pest Detection</h4>
                  <p className="text-sm">Utilizes computer vision and machine learning to analyze plant images, identify diseases, pests, or nutrient deficiencies, and recommend appropriate treatment options with over 90% accuracy.</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 bg-indigo-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2 text-indigo-700">How It Works</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-3 rounded-lg border border-indigo-100 text-center">
                  <p className="text-sm"><span className="font-medium">Input:</span> Farmers interact via voice, text, or images through mobile app or USSD</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-indigo-100 text-center">
                  <p className="text-sm"><span className="font-medium">Processing:</span> AI analyzes data using trained models specific to Nigerian agriculture</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-indigo-100 text-center">
                  <p className="text-sm"><span className="font-medium">Output:</span> Personalized recommendations in the farmer's preferred language</p>
                </div>
              </div>
            </div>
          </div>
        </div>


      {/* Driving Innovation */}
      <section className="mb-12">
        <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Driving Agricultural Innovation and Sustainability</h2>
          <p className="mb-4">
            CCSA's and its partners/collaborators' digital platforms are practical, scalable and policy-driven, ensuring
            that stakeholders across the agricultural value chain benefit from cutting-edge technology. We are fostering
            a more sustainable, efficient and resilient agricultural ecosystem by integrating AI, data analytics and
            smart farming solutions.
          </p>

          <div className="mt-6 flex justify-center">
            <Link
              href="/activities"
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition duration-300"
            >
              Learn More About Our Activities <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Technology Showcase */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-center">Our Technology in Action</h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
            <div className="h-48 relative p-3 overflow-hidden">
              <Image src={aiImage} alt="Mobile farm application" fill className="object-cover p-2" />
            </div>
            <div className="p-4">
              <h3 className="font-semibold mb-2">Mobile Applications</h3>
              <p className="text-sm">
                Farmers accessing real-time information and advisory services through their mobile devices.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
            <div className="h-48 bg-gray-200 relative">
              <Image src={analytics} alt="Agricultural data analytics" fill className="object-cover" />
            </div>
            <div className="p-4">
              <h3 className="font-semibold mb-2">Data Analytics</h3>
              <p className="text-sm">Advanced analytics providing insights for better agricultural decision-making.</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
            <div className="h-48 bg-gray-200 relative">
              <Image
                src={marketPlace}
                alt="Digital agricultural marketplace"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold mb-2">Digital Marketplaces</h3>
              <p className="text-sm">Connecting farmers directly with buyers through secure online platforms.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center bg-blue-50 p-8 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Partner With Us</h2>
        <p className="mb-6 max-w-2xl mx-auto">
          Are you a technology provider, agricultural expert, or organization interested in advancing digital
          agriculture? Join us in developing innovative solutions for climate-smart agriculture.
        </p>
        <button className="bg-brand hover:bg-green-700 text-white font-medium py-2 px-6 rounded-md transition duration-300">
          Contact Us to learn more
        </button>
      </section>
    </div>
    </div>
  )
}

export default page