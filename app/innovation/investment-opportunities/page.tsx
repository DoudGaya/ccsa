import Image from "next/image"
import Link from "next/link"
import investBanner from '@/public/news-and-events.jpg'
import { 
    Banknote, 
    TrendingUp, 
    Factory, 
    Leaf, 
    BarChart3, 
    Users, 
    HandshakeIcon, 
    Mail 
} from "lucide-react"

import PublicBanners from "@/app/components/PublicBanners"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const pageData = {
  title: "Agri-Investment",
  description: "Unlocking new opportunities through value-added agriculture investments",
}

export default function AgriInvestmentPage() {
  return (
    <div>
      <PublicBanners title={pageData.title} message={pageData.description} />

      <div className="container mx-auto px-4 py-12 max-w-5xl font-main">
        <h1 className="text-3xl font-bold mb-8 text-center">Value-Added Agriculture: Unlocking New Opportunities</h1>

        {/* Hero Section */}
        <section className="mb-12">
          <div className="relative h-[400px] w-full rounded-xl overflow-hidden mb-8">
            <Image
              src={investBanner.src}
              alt="Agricultural Investment"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-green-900/70 to-transparent flex items-center">
              <div className="max-w-lg p-8">
                <h2 className="text-3xl font-bold text-white mb-4">Invest in Nigeria's Agricultural Future</h2>
                <p className="text-white/90 text-lg">
                  Join us in transforming agricultural value chains through innovative processing solutions
                </p>
                <Button className="mt-6 bg-green-600 hover:bg-green-700 text-white">
                  <Link href="#opportunities" className="flex items-center">
                    Explore Opportunities
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="mb-12">
          <div className="bg-white dark:bg-slate-950 p-8 rounded-xl shadow-sm border">
            <p className="text-lg leading-relaxed mb-6">
              At the Centre for Climate-Smart Agriculture, Cosmopolitan University Abuja, Nigeria, our agribusiness
              mandate focuses on enhancing the agricultural value chain through innovative processing solutions. We aim
              to empower agribusinesses and entrepreneurs to diversify their product offerings, add value, increase
              profitability, and contribute to Nigeria's economic growth.
            </p>
          </div>
        </section>

        {/* Investment Opportunities */}
        <section id="opportunities" className="mb-16">
          <h2 className="text-2xl font-semibold mb-8 border-b pb-2">Investment Opportunities</h2>
          <p className="mb-8 text-lg">
            We present exciting investment opportunities in value-added agriculture in collaboration with our various
            partners:
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Food Processing Plant */}
            <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="h-48 bg-gradient-to-r from-green-500 to-green-700 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Factory className="h-20 w-20 text-white/80" />
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full mr-4">
                    <Factory className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold">Food Processing Plant</h3>
                </div>
                <p className="mb-4">
                  Opportunity to set up a smart factory with an investment of approximately{" "}
                  <span className="font-bold text-green-600 dark:text-green-400">$20,000</span> that can handle grains,
                  nuts, fruits, and vegetables.
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  Nigeria's food and beverage market is poised for strong growth, driven by a growing population, rising
                  disposable incomes, and shifting consumer trends.
                </p>
              </CardContent>
            </Card>

            {/* Fruit, Vegetable, and Oil Processing Facility */}
            <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="h-48 bg-gradient-to-r from-amber-500 to-amber-700 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Leaf className="h-20 w-20 text-white/80" />
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-full mr-4">
                    <Leaf className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                  </div>
                  <h3 className="text-xl font-semibold">Fruit, Vegetable, and Oil Processing Facility</h3>
                </div>
                <p className="mb-4">
                  Invest <span className="font-bold text-amber-600 dark:text-amber-400">$15,000</span> in a mid-level
                  processing facility focused on fruits, vegetables, and cooking oils, producing juices, jams, and
                  healthy cooking oils.
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  The fruit and vegetable processing market in Nigeria is expected to reach ₦140 billion ($93 million)
                  by 2025 (Source: Nigerian Investment Promotion Commission).
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Market Growth Prospects */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 border-b pb-2">Market Growth Prospects</h2>

          <div className="bg-gradient-to-r from-green-50 dark:from-gray-900 dark:to-slate-900 to-blue-50 p-8 rounded-xl mb-8">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/2">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full mr-4">
                    <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold">Growth Projections</h3>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-green-600 dark:text-green-400 mr-2">•</span>
                    <p>
                      Nigeria's food and beverage market size is estimated to grow significantly, with a projected
                      compound annual growth rate (CAGR) of 5.5% from 2023 to 2028 in the broader food processing sector
                      (Source: Euromonitor).
                    </p>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 dark:text-green-400 mr-2">•</span>
                    <p>
                      The global food and beverage market size was estimated at $7 trillion in 2020, with changing
                      consumer lifestyles and preferences driving growth.
                    </p>
                  </li>
                </ul>
              </div>
              <div className="md:w-1/2">
                <div className="h-full flex items-center justify-center">
                  <div className="relative h-64 w-full">
                    <BarChart3 className="absolute inset-0 h-full w-full text-blue-200 dark:text-blue-900/30" />
                    <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-blue-500/80 dark:bg-blue-600/80 rounded-t-md"></div>
                    <div className="absolute bottom-0 left-1/3 w-1/3 h-3/4 bg-green-500/80 dark:bg-green-600/80 rounded-t-md"></div>
                    <div className="absolute bottom-0 left-2/3 w-1/3 h-5/6 bg-amber-500/80 dark:bg-amber-600/80 rounded-t-md"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Invest */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 border-b pb-2">Why Invest?</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-slate-950 p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full mr-4">
                  <Leaf className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold">Growing Demand</h3>
              </div>
              <p>Growing demand for organic, natural, and fresh foods</p>
            </div>

            <div className="bg-white dark:bg-slate-950 p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className="bg-teal-100 dark:bg-teal-900/30 p-3 rounded-full mr-4">
                  <TrendingUp className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                </div>
                <h3 className="text-lg font-semibold">Increasing Demand</h3>
              </div>
              <p>Increasing demand from restaurants, fast-food chains, and food delivery applications</p>
            </div>

            <div className="bg-white dark:bg-slate-950 p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-full mr-4">
                  <Users className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="text-lg font-semibold">Health Awareness</h3>
              </div>
              <p>Rising health awareness and demand for nutritious and processed foods</p>
            </div>
          </div>
        </section>

        {/* Benefits for Agripreneurs */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 border-b pb-2">Benefits for Agripreneurs</h2>

          <div className="bg-white dark:bg-slate-950 p-8 rounded-xl shadow-sm border">
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full mr-4 mt-1">
                  <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <p>Diversify product portfolios and enhance revenue streams</p>
              </li>
              <li className="flex items-start">
                <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full mr-4 mt-1">
                  <Banknote className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <p>
                  Contribute to food security and support Nigeria's economic growth (3.5% GDP growth rate by 2025, World
                  Bank)
                </p>
              </li>
              <li className="flex items-start">
                <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full mr-4 mt-1">
                  <Users className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <p>Create employment opportunities and stimulate local economic development</p>
              </li>
              <li className="flex items-start">
                <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full mr-4 mt-1">
                  <Leaf className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <p>Leverage our expertise in climate-smart agriculture and innovative processing solutions</p>
              </li>
            </ul>
          </div>
        </section>

        {/* Why Partner With Us */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 border-b pb-2">Why Partner with Us?</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-950 p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full mr-4">
                  <HandshakeIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold">Access to Technology</h3>
              </div>
              <p>Gain access to cutting-edge technology and innovative processing solutions</p>
            </div>

            <div className="bg-white dark:bg-slate-950 p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-full mr-4">
                  <Leaf className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-lg font-semibold">Expert Knowledge</h3>
              </div>
              <p>Leverage our expertise in climate-smart agriculture and sustainable practices</p>
            </div>

            <div className="bg-white dark:bg-slate-950 p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full mr-4">
                  <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold">Training Programs</h3>
              </div>
              <p>Participate in training and capacity-building programmes for staff</p>
            </div>

            <div className="bg-white dark:bg-slate-950 p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className="bg-teal-100 dark:bg-teal-900/30 p-3 rounded-full mr-4">
                  <Users className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                </div>
                <h3 className="text-lg font-semibold">Network Access</h3>
              </div>
              <p>Network with other agribusinesses and stakeholders</p>
            </div>
          </div>

          <div className="mt-8 bg-gradient-to-r from-green-50 dark:from-gray-900 dark:to-slate-900 to-blue-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Partner Network Benefits</h3>
            <p className="mb-4">Benefit from our partner network, which can assist with:</p>
            <ul className="space-y-2 pl-6">
              <li className="flex items-center">
                <span className="text-green-600 dark:text-green-400 mr-2">•</span>
                <p>Planning and feasibility studies</p>
              </li>
              <li className="flex items-center">
                <span className="text-green-600 dark:text-green-400 mr-2">•</span>
                <p>Procurement and installation of equipment</p>
              </li>
              <li className="flex items-center">
                <span className="text-green-600 dark:text-green-400 mr-2">•</span>
                <p>Maintenance and technical support</p>
              </li>
            </ul>
          </div>
        </section>

        {/* Get Involved */}
        <section className="mb-12">
          <div className="bg-green-700 dark:bg-green-800 text-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-6">Get Involved</h2>
            <p className="mb-6 text-lg">
              Are you interested in exploring these opportunities or learning more about our initiatives? Please contact
              us to unlock new possibilities in Nigeria's agricultural sector.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="outline"
                className="bg-white text-green-700 hover:bg-gray-100 hover:text-green-800 border-none"
              >
                <Link href="/contact" className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Contact Us
                </Link>
              </Button>
              {/* <Button variant="outline" className="bg-transparent text-white hover:bg-white/10 border-white">
                <Link href="#opportunities" className="flex items-center gap-2">
                  Learn More
                </Link>
              </Button> */}
            </div>
          </div>
        </section>

        {/* Conclusion */}
        <section className="text-center">
          <p className="text-xl font-medium text-gray-700 dark:text-gray-300">
            Let us support your agribusiness journey.
          </p>
        </section>
      </div>
    </div>
  )
}
