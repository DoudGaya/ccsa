import React from 'react'
import { InnovationBanner } from '../_components/InnovationBanner'
import innovationBannerImmage from '@/public/innovation-banner.jpg'
import PublicBanners from '@/app/components/PublicBanners'
import { PortableText } from 'next-sanity'
import Image from "next/image"
import { Users, Calendar, Target, BarChart3, BookOpen, Sprout, Building, CheckCircle2 } from "lucide-react"



const pageData = {
    title: "Farmer Incubator Programme for Climate-Smart Agriculture (FIP-CSA)",
    description:
      "The FIP-CSA aims to support 1,800 smallholder farmers in Nigeria over five years in adopting climate-smart agricultural (CSA) practices, improving their productivity, resilience, and livelihoods.",
    href: "/media/farmer-incubation",
  }

const page = () => {
  return (
    <div>
        <PublicBanners title={pageData.title} message={pageData.description} /> 
         {/* <article className=" prose lg:prose-lg dark:prose-invert font-blog text-lg space-y-6">
                <PortableText 
                // @ts-ignore
                value={article.body} />
               </article> */}

<div className="container mx-auto px-4 py-8 max-w-5xl font-main font-semibold">
      <h1 className="text-3xl font-bold mb-2 text-center">Farmer Incubator Programme</h1>
      <h2 className="text-xl font-medium mb-8 text-center text-green-700">for Climate-Smart Agriculture (FIP-CSA)</h2>

      {/* Hero Image */}
      {/* <div className="mb-12">
        <Image
          src="/images/farmer-training.jpg"
          alt="Farmers participating in training"
          width={1000}
          height={500}
          className="rounded-lg mb-6 w-full object-cover"
        />
      </div> */}

      {/* Introduction */}
      <section className="mb-12">
        <div className="bg-green-50 p-6 rounded-lg border border-green-100">
          <p className="text-lg">
            The FIP-CSA aims to support 1,800 smallholder farmers in Nigeria over five years in adopting climate-smart
            agricultural (CSA) practices, improving their productivity, resilience, and livelihoods.
          </p>
        </div>
      </section>

      {/* Objectives */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 border-b pb-2 flex items-center">
          <Target className="h-6 w-6 mr-2 text-green-600" />
          Objectives
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold mb-3 text-green-700">Capacity Building</h3>
            <p>
              Enhance the capacity of smallholder farmers to adopt CSA practices and improve their productivity and
              resilience.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold mb-3 text-green-700">Access to Markets and Resources</h3>
            <p>
              Provide farmers with access to markets, finance, implementation, and other resources to support their
              agricultural enterprises.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold mb-3 text-green-700">Sustainable Agriculture Practices</h3>
            <p>Promote sustainable agriculture practices and reduce the environmental impact of farming.</p>
          </div>
        </div>
      </section>

      {/* Target Beneficiaries */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 border-b pb-2 flex items-center">
          <Users className="h-6 w-6 mr-2 text-green-600" />
          Target Beneficiaries
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border flex items-center">
            <div className="bg-amber-100 p-3 rounded-full mr-4">
              <Users className="h-8 w-8 text-amber-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-1">6,000 Smallholder Farmers</h3>
              <p>Across 12 states of Nigeria, particularly women and youth</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border flex items-center">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <Building className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-1">12 Farmers' Organisations</h3>
              <p>Cooperatives and agricultural associations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Programme Structure */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 border-b pb-2 flex items-center">
          <BookOpen className="h-6 w-6 mr-2 text-green-600" />
          Programme Structure
        </h2>

        <p className="mb-6">The programme will consist of two phases, spanning 260 weeks over five years:</p>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-start">
              <div className="bg-green-100 p-3 rounded-full mr-4 mt-1">
                <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center font-bold">
                  1
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Phase 1: Training and Capacity Building (Weeks 1-20)</h3>
                <p>
                  Comprehensive training on CSA practices, business management, and entrepreneurship, focusing on
                  practical skills and knowledge relevant to Nigerian smallholder farmers.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-start">
              <div className="bg-green-100 p-3 rounded-full mr-4 mt-1">
                <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center font-bold">
                  2
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Phase 2: Mentorship and Project Implementation (Weeks 21-260)
                </h3>
                <p>
                  The mentorship and project implementation phase provides farmers access to markets, finance,
                  implementation, and other resources, as well as guidance and support to implement their CSA projects.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programme Outcomes */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 border-b pb-2 flex items-center">
          <CheckCircle2 className="h-6 w-6 mr-2 text-green-600" />
          Programme Outcomes
        </h2>

        <p className="mb-6">By the end of the programme, farmers are expected to:</p>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <ul className="space-y-4">
            <li className="flex items-start">
              <CheckCircle2 className="h-5 w-5 mr-2 text-green-600 mt-0.5 flex-shrink-0" />
              <span>Adopt CSA practices and improve productivity and resilience.</span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="h-5 w-5 mr-2 text-green-600 mt-0.5 flex-shrink-0" />
              <span>Access markets, finance, and other resources to support agricultural enterprises.</span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="h-5 w-5 mr-2 text-green-600 mt-0.5 flex-shrink-0" />
              <span>Practice sustainable agriculture and reduce environmental impact.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Implementation Plan */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 border-b pb-2 flex items-center">
          <Calendar className="h-6 w-6 mr-2 text-green-600" />
          Implementation Plan
        </h2>

        <p className="mb-6">
          The Farmer Incubator Program for Climate-Smart Agriculture (FIP-CSA) will be implemented over five years, from
          March 2025 to March 2030.
        </p>

        {/* Timeline visualization */}
        <div className="relative mb-12">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-green-200"></div>

          <div className="space-y-8">
            {/* Year 1 */}
            <div className="relative pl-12">
              <div className="absolute left-0 w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">
                1
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold mb-2">Year 1 (2025): Programme Design and Launch</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Conduct programme design and planning (March 2025)</li>
                  <li>Select partner organisations (April 2025)</li>
                  <li>Launch the programme and commence farmer recruitment (May 2025)</li>
                  <li>Establish programme management structure and recruit staff</li>
                  <li>Develop and disseminate promotional materials</li>
                </ul>
              </div>
            </div>

            {/* Years 2-4 */}
            <div className="relative pl-12">
              <div className="absolute left-0 w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">
                2-4
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold mb-2">Years 2-4 (2026-2029): Programme Implementation</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Implement programme activities (training, mentorship, projects)</li>
                  <li>Provide technical assistance and support to farmers</li>
                  <li>Monitor and evaluate programme progress</li>
                </ul>
              </div>
            </div>

            {/* Year 5 */}
            <div className="relative pl-12">
              <div className="absolute left-0 w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">
                5
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold mb-2">Year 5 (2030): Programme Evaluation and Sustainability</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Evaluate programme impact</li>
                  <li>Finalise programme evaluation and reporting</li>
                  <li>Develop sustainability plan for programme continuation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Monitoring and Evaluation */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 border-b pb-2 flex items-center">
          <BarChart3 className="h-6 w-6 mr-2 text-green-600" />
          Monitoring, Evaluation and Metrics for Success
        </h2>

        <p className="mb-6">The program's success will be evaluated based on the following metrics:</p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded-lg shadow-sm border">
            <div className="flex items-center mb-2">
              <div className="bg-green-100 p-2 rounded-full mr-3">
                <Users className="h-5 w-5 text-green-600" />
              </div>
              <h3 className="font-semibold">Number of Farmers Trained</h3>
            </div>
            <p className="text-sm">The number of farmers who receive training and support through the program.</p>
          </div>

          <div className="bg-white p-5 rounded-lg shadow-sm border">
            <div className="flex items-center mb-2">
              <div className="bg-green-100 p-2 rounded-full mr-3">
                <BarChart3 className="h-5 w-5 text-green-600" />
              </div>
              <h3 className="font-semibold">Increase in Income & Productivity</h3>
            </div>
            <p className="text-sm">
              The percentage increase in farmers' income and productivity as a result of the program.
            </p>
          </div>

          <div className="bg-white p-5 rounded-lg shadow-sm border">
            <div className="flex items-center mb-2">
              <div className="bg-green-100 p-2 rounded-full mr-3">
                <Sprout className="h-5 w-5 text-green-600" />
              </div>
              <h3 className="font-semibold">Adoption Rate of CSA Practices</h3>
            </div>
            <p className="text-sm">The percentage of farmers who adopt climate-smart agriculture practices.</p>
          </div>

          <div className="bg-white p-5 rounded-lg shadow-sm border">
            <div className="flex items-center mb-2">
              <div className="bg-green-100 p-2 rounded-full mr-3">
                <Target className="h-5 w-5 text-green-600" />
              </div>
              <h3 className="font-semibold">Improvement in Climate Resilience</h3>
            </div>
            <p className="text-sm">The percentage improvement in farmers' resilience to climate change.</p>
          </div>

          <div className="bg-white p-5 rounded-lg shadow-sm border md:col-span-2">
            <div className="flex items-center mb-2">
              <div className="bg-green-100 p-2 rounded-full mr-3">
                <Building className="h-5 w-5 text-green-600" />
              </div>
              <h3 className="font-semibold">Market Access</h3>
            </div>
            <p className="text-sm">
              The number of farmers who access markets and trade opportunities as a result of the program.
            </p>
          </div>
        </div>
      </section>

      {/* Practicalities */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 border-b pb-2">Practicalities</h2>

        <p className="mb-6">
          The programme will be informed by an appreciation of the practical realities confronting Nigerian smallholder
          farmers. To ensure the programme's efficacy and relevance, the following considerations will be taken into
          account:
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-5 rounded-lg shadow-sm border">
            <h3 className="font-semibold mb-2 text-green-700">Language</h3>
            <p>
              Training materials and mentorship will be provided in local languages to facilitate comprehension and
              engagement.
            </p>
          </div>

          <div className="bg-white p-5 rounded-lg shadow-sm border">
            <h3 className="font-semibold mb-2 text-green-700">Literacy</h3>
            <p>
              Training materials will be designed to accommodate varying levels of literacy, ensuring inclusivity and
              accessibility.
            </p>
          </div>

          <div className="bg-white p-5 rounded-lg shadow-sm border">
            <h3 className="font-semibold mb-2 text-green-700">Technology</h3>
            <p>
              Mobile technology will be leveraged to provide farmers with access to information, markets, and resources.
            </p>
          </div>

          <div className="bg-white p-5 rounded-lg shadow-sm border">
            <h3 className="font-semibold mb-2 text-green-700">Finance</h3>
            <p>
              Access to finance and credit facilities will be facilitated to support farmers' agricultural enterprises.
            </p>
          </div>
        </div>
      </section>

      {/* Conclusion */}
      <section className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">Conclusion</h2>
        <p className="mb-4">
          The Farmer Incubator Program for Climate-Smart Agriculture (FIP-CSA) is a multifaceted initiative designed to
          support 1,800 smallholder farmers in Nigeria over a five-year period. The programme's primary objectives are
          to enhance farmers' capacity to adopt climate-smart agricultural practices, facilitate access to markets and
          resources, and promote sustainable agriculture.
        </p>
        <p className="mb-4">
          Upon completion of the programme, participating farmers are expected to have adopted climate-smart practices,
          gained access to markets and resources, and adopted sustainable agricultural methods. The programme's success
          will be evaluated based on key performance indicators, including the number of farmers trained and supported,
          and the adoption rate of climate-smart practices.
        </p>
        <p>
          The FIP-CSA has the potential to make a significant positive impact on the livelihoods of smallholder farmers
          in Nigeria, contributing to the country's efforts to promote climate-smart agriculture and sustainable
          development. By addressing the complex challenges faced by smallholder farmers, the programme can help to
          ensure a more resilient and sustainable agricultural sector in Nigeria.
        </p>
      </section>

      {/* Call to Action */}
      {/* <section className="text-center">
        <h2 className="text-xl font-semibold mb-4">Interested in Participating?</h2>
        <p className="mb-6">
          Applications for the first cohort of the Farmer Incubator Programme will open in March 2025.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-md transition duration-300">
            Register Interest
          </button>
          <button className="bg-white border border-green-600 hover:bg-green-50 text-green-600 font-medium py-2 px-6 rounded-md transition duration-300">
            Partner With Us
          </button>
        </div>
      </section> */}
    </div>

    </div>
  )
}

export default page