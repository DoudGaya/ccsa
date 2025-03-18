// import React from 'react'
import aboutBannerImage from '@/public/about-banner.jpg'
import { AboutBanner } from '../_component/AboutBanner'
import rislan from '@/public/rislan.png'
import partnerships from '@/public/partnership.jpg'


import Image from "next/image"
import Link from "next/link"
import {
  Handshake,
  FileText,
  Target,
  CheckCircle2,
  Users,
  GraduationCap,
  Globe,
  Briefcase,
  Home,
  MessageSquare,
  ClipboardList,
  AlertCircle,
  Mail,
} from "lucide-react"

const PartnershipPage = () => {
  // Types of partnerships with icons and descriptions
  const partnershipTypes = [
    {
      title: "Research and Development",
      icon: <FileText className="h-8 w-8 text-blue-600" />,
      color: "bg-blue-100",
      description:
        "Collaborations with research institutions, universities and other organizations to conduct research, develop new technologies and promote innovation in climate-smart agriculture.",
    },
    {
      title: "Implementation and Scaling",
      icon: <Target className="h-8 w-8 text-green-600" />,
      color: "bg-green-100",
      description:
        "Collaborations with NGOs, community-based organizations, private sector companies and government agencies to implement projects and scale up successful interventions.",
    },
    {
      title: "Advocacy and Policy",
      icon: <FileText className="h-8 w-8 text-purple-600" />,
      color: "bg-purple-100",
      description:
        "Collaborations with civil society organizations, government agencies and international organizations to advocate for policy changes and influence decision-making processes.",
    },
    {
      title: "Capacity Building and Training",
      icon: <GraduationCap className="h-8 w-8 text-amber-600" />,
      color: "bg-amber-100",
      description:
        "Collaborations with training institutions and universities to build capacity of farmers, extension agents and other stakeholders in climate-smart agriculture practices.",
    },
    {
      title: "Private Sector",
      icon: <Briefcase className="h-8 w-8 text-indigo-600" />,
      color: "bg-indigo-100",
      description:
        "Collaborations with private sector companies to promote climate-smart agriculture practices, develop new markets and improve access to finance and technology.",
    },
    {
      title: "Community-Based",
      icon: <Home className="h-8 w-8 text-orange-600" />,
      color: "bg-orange-100",
      description:
        "Collaborations with community-based organizations, cooperatives and self-help groups to promote climate-smart agriculture practices and improve livelihoods.",
    },
    {
      title: "International",
      icon: <Globe className="h-8 w-8 text-teal-600" />,
      color: "bg-teal-100",
      description:
        "Collaborations with international organizations, research institutions and NGOs to promote climate-smart agriculture practices and share knowledge globally.",
    },
  ]

  // Partnership principles
  const principles = [
    {
      title: "Mutual Benefit",
      description: "Partnerships will be based on mutual benefit, where all parties benefit from the collaboration.",
    },
    {
      title: "Transparency",
      description:
        "CCSA will ensure transparency in all partnership agreements, including clear roles, responsibilities and expectations.",
    },
    {
      title: "Accountability",
      description: "CCSA will hold itself and its partners accountable for their actions and outcomes.",
    },
    { title: "Respect", description: "CCSA will respect the autonomy, values and cultures of its partners." },
    {
      title: "Equity",
      description:
        "CCSA will strive for equitable partnerships, where all parties have a voice and contribute to decision-making.",
    },
  ]

  // Partnership development process
  const developmentProcess = [
    {
      title: "Identification",
      description:
        "CCSA will identify potential partners based on their expertise, experience and alignment with CCSA's mission and objectives.",
    },
    {
      title: "Initial Contact",
      description:
        "CCSA will make initial contact with potential partners to explore areas of collaboration and mutual interest.",
    },
    {
      title: "Proposal Development",
      description:
        "CCSA will develop a partnership proposal outlining the terms of the partnership, including roles, responsibilities and expectations.",
    },
    {
      title: "Agreement Negotiation",
      description:
        "CCSA will negotiate a partnership agreement with the partner organization, ensuring alignment with CCSA's policies.",
    },
    {
      title: "Implementation & Monitoring",
      description:
        "CCSA will implement the partnership agreement and monitor progress, ensuring objectives are being met.",
    },
  ]

  return (
   <div className="">
     <AboutBanner 
    bannerImage={aboutBannerImage.src}
    title='Our Partnerships Policies'
    description='Learn about our strategic partnerships with other organizations'
  />
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-12">
        <h1 className="text-3xl font-bold mb-2 text-center">Partnership Policy</h1>
        <h2 className="text-xl font-medium mb-8 text-center text-teal-700">
          Centre for Climate Smart Agriculture (CCSA), Cosmopolitan University Abuja
        </h2>

        {/* Hero Image */}
        <div className="relative h-80 rounded-xl overflow-hidden mb-8">
          <Image src={partnerships} alt="CCSA Partnerships" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-teal-900/70 to-transparent flex items-center">
            <div className="text-white p-8 max-w-lg">
              <h2 className="text-3xl font-bold mb-4">Building Stronger Together</h2>
              <p className="text-lg">
                Collaborating with diverse stakeholders to advance climate-smart agriculture in Nigeria and beyond.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Introduction */}
      <section className="mb-12">
        <div className="bg-gradient-to-r from-teal-50 to-blue-50 p-6 rounded-lg border border-teal-100">
          <div className="flex items-start mb-4">
            <div className="bg-teal-100 p-3 rounded-full mr-4 mt-1">
              <Handshake className="h-6 w-6 text-teal-600" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
              <p className="mb-4">
                The Centre for Climate Smart Agriculture (CCSA) at Cosmopolitan University Abuja (CUA) recognizes the
                importance of partnerships in achieving its mission to promote sustainable agricultural practices,
                enhance farmer resilience and improve agricultural productivity in Nigeria. This partnership policy
                outlines the principles, procedures and guidelines for establishing and maintaining partnerships with
                various stakeholders.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Purpose */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 border-b pb-2 flex items-center">
          <Target className="h-6 w-6 mr-2 text-teal-600" />
          Purpose
        </h2>

        <p className="mb-4">The purpose of this policy is to:</p>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <ol className="space-y-3">
            <li className="flex items-start">
              <span className="bg-teal-100 text-teal-700 font-bold rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                1
              </span>
              <span>Establish clear guidelines for partnership development and management.</span>
            </li>
            <li className="flex items-start">
              <span className="bg-teal-100 text-teal-700 font-bold rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                2
              </span>
              <span>Ensure that partnerships align with CCSA's mission, vision and objectives.</span>
            </li>
            <li className="flex items-start">
              <span className="bg-teal-100 text-teal-700 font-bold rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                3
              </span>
              <span>Foster collaborative relationships with stakeholders to achieve common goals.</span>
            </li>
            <li className="flex items-start">
              <span className="bg-teal-100 text-teal-700 font-bold rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                4
              </span>
              <span>Promote transparency, accountability and mutual benefit in all partnerships.</span>
            </li>
          </ol>
        </div>
      </section>

      {/* Principles */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 border-b pb-2 flex items-center">
          <CheckCircle2 className="h-6 w-6 mr-2 text-teal-600" />
          Principles
        </h2>

        <p className="mb-4">CCSA will adhere to the following principles in its partnerships:</p>

        <div className="grid md:grid-cols-5 gap-4">
          {principles.map((principle, index) => (
            <div
              key={index}
              className="bg-white p-5 rounded-lg shadow-sm border text-center hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold mb-2 text-teal-700">{principle.title}</h3>
              <p className="text-sm">{principle.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Types of Partnerships */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 border-b pb-2 flex items-center">
          <Users className="h-6 w-6 mr-2 text-teal-600" />
          Types of Partnerships
        </h2>

        <p className="mb-6">
          CCSA may engage in various types of partnerships to achieve its mission and objectives. These partnerships may
          include:
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {partnershipTypes.map((type, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className={`${type.color} p-3 rounded-full mr-4`}>{type.icon}</div>
                <h3 className="text-lg font-semibold">{type.title}</h3>
              </div>
              <p className="text-sm text-gray-700">{type.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-gray-50 p-4 rounded-lg">
          <p>
            These partnerships will be guided by the principles of mutual benefit, transparency, accountability,
            respect and equity. CCSA will work to ensure that all partnerships are aligned with its mission, vision,
            and objectives and that they contribute to the achievement of its strategic goals.
          </p>
        </div>
      </section>

      {/* Partnership Development Process */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 border-b pb-2 flex items-center">
          <ClipboardList className="h-6 w-6 mr-2 text-teal-600" />
          Partnership Development Process
        </h2>

        <p className="mb-6">The following steps will be taken to develop and establish partnerships:</p>

        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-teal-200 hidden md:block"></div>

          <div className="space-y-6">
            {developmentProcess.map((step, index) => (
              <div key={index} className="relative md:pl-16">
                <div className="absolute left-0 w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center text-white font-bold hidden md:flex">
                  {index + 1}
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border">
                  <div className="md:hidden mb-2 flex items-center">
                    <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center text-white font-bold mr-3">
                      {index + 1}
                    </div>
                    <h3 className="font-semibold">{step.title}</h3>
                  </div>
                  <div className="hidden md:block">
                    <h3 className="font-semibold mb-2">{step.title}</h3>
                  </div>
                  <p className="text-sm">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Management */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 border-b pb-2 flex items-center">
          <MessageSquare className="h-6 w-6 mr-2 text-teal-600" />
          Partnership Management
        </h2>

        <p className="mb-4">CCSA will manage its partnerships through:</p>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white p-5 rounded-lg shadow-sm border">
            <h3 className="font-semibold mb-2 text-teal-700">Regular Communication</h3>
            <p className="text-sm">
              Regular communication with partners to ensure that all parties are informed and engaged.
            </p>
          </div>

          <div className="bg-white p-5 rounded-lg shadow-sm border">
            <h3 className="font-semibold mb-2 text-teal-700">Progress Monitoring</h3>
            <p className="text-sm">
              Regular monitoring of partnership progress to ensure that objectives are being met.
            </p>
          </div>

          <div className="bg-white p-5 rounded-lg shadow-sm border">
            <h3 className="font-semibold mb-2 text-teal-700">Problem-solving</h3>
            <p className="text-sm">
              CCSA will work with partners to resolve any issues or challenges that arise during the partnership.
            </p>
          </div>

          <div className="bg-white p-5 rounded-lg shadow-sm border">
            <h3 className="font-semibold mb-2 text-teal-700">Partnership Evaluation</h3>
            <p className="text-sm">
              CCSA will evaluate the partnership at the end of the agreement period to assess its effectiveness and
              impact.
            </p>
          </div>
        </div>
      </section>

      {/* Termination of Partnerships */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 border-b pb-2 flex items-center">
          <AlertCircle className="h-6 w-6 mr-2 text-teal-600" />
          Termination of Partnerships
        </h2>

        <p className="mb-4">CCSA may terminate a partnership if:</p>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <ul className="space-y-3">
            <li className="flex items-start">
              <CheckCircle2 className="h-5 w-5 mr-3 text-red-500 mt-0.5 flex-shrink-0" />
              <span>
                <strong>Objectives are not being met:</strong> The partnership is not meeting its intended objectives.
              </span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="h-5 w-5 mr-3 text-red-500 mt-0.5 flex-shrink-0" />
              <span>
                <strong>Partnership agreement is not being upheld:</strong> The partner organization is not upholding
                its responsibilities and obligations as outlined in the partnership agreement.
              </span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="h-5 w-5 mr-3 text-red-500 mt-0.5 flex-shrink-0" />
              <span>
                <strong>Conflict of interest:</strong> A conflict of interest arises that cannot be resolved.
              </span>
            </li>
          </ul>
        </div>
      </section>

      {/* Approval and Amendment */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 border-b pb-2">Approval and Amendment</h2>

        <div className="bg-gray-50 p-6 rounded-lg">
          <p className="mb-4">
            This policy was approved by the CCSA Management Team. This policy may be amended or updated at any time,
            with changes approved by the CCSA Management Team.
          </p>
          <p>
            <strong>Acknowledgement:</strong> By partnering with CCSA, partner organizations acknowledge that they have
            read, understood and agreed to abide by this partnership policy.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 border-b pb-2 flex items-center">
          <Mail className="h-6 w-6 mr-2 text-teal-600" />
          Contact Information
        </h2>

        <div className="bg-white text-center flex flex-col items-center p-6 rounded-lg shadow-md border border-teal-100">
          <p className="mb-4">For further information or clarification on this policy, please contact:</p>

          <div className="flex flex-col text-center md:flex-col md:items-center">
            {/* <div className="md:w-1/3 mb-4 md:mb-0">
            
            </div> */}

            <div className=" md:pl-6">
              <h3 className="text-xl font-semibold mb-2">Dr. Rislan Abdulazeez Kanya</h3>
              <p className="mb-1">
                <strong>Position:</strong> Founder/CEO
              </p>
              <p className="mb-1">
                <strong>Organization:</strong> Centre for Climate-Smart Agriculture
              </p>
              <p className="mb-1">
                <strong>Institution:</strong> Cosmopolitan University
              </p>
              <p className="mb-1">
                <strong>Address:</strong> Abuja, Central Business District, Opposite National Hospital, Abuja, Nigeria
              </p>
              {/* <p className="mb-1">
                <strong>Mobile:</strong> +2348035502270
              </p> */}
              <p className="mb-1">
                <strong>Email:</strong> ccsa@cosmopolitan.edu.ng
              </p>
              <p>
                <strong>Website:</strong>{" "}
                <a
                  href="https://ccsa.cosmopolitan.edu.ng"
                  className="text-teal-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://ccsa.cosmopolitan.edu.ng
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-teal-50 to-blue-50 p-8 rounded-lg text-center">
        <h2 className="text-2xl font-semibold mb-4">Partner With Us</h2>
        <p className="mb-6 max-w-2xl mx-auto">
          Join us in our mission to promote sustainable agricultural practices, enhance farmer resilience and improve
          agricultural productivity in Nigeria and beyond.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-6 rounded-md transition duration-300"
          >
            Become a Partner
          </Link>
          <Link
            href="/trainings"
            className="bg-white border border-teal-600 hover:bg-teal-50 text-teal-600 font-medium py-2 px-6 rounded-md transition duration-300"
          >
            Explore Our Trainings 
          </Link>
        </div>
      </section>
    </div>
   </div>
  )
}

export default PartnershipPage

