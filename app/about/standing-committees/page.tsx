import { Leaf, Cpu, Briefcase, FileText, Handshake } from "lucide-react"
import React from 'react'
import aboutBannerImage from '@/public/about-banner.jpg'
import { AboutBanner } from '../_component/AboutBanner'
import { Facebook, Linkedin, Twitter } from "lucide-react"
import placeHolderImage from '@/public/placeholder-img.png'
import Link from 'next/link'
import Image from 'next/image'
// import { getAllMemberType, getSingleMemberType } from '@/sanity/lib/queries'
import { getAllMemberType, getBoardMembersWithoutPriority, getManagementMembers, getPriorityBoardMembers, getSingleMemberType } from '@/sanity/lib/quesries/membersQuesries'
import { SanityTypes } from '@/@types'
import TeamMemberCard from '../_component/team-member-card'
import { notFound } from 'next/navigation'
import { getAllStandingCommittee } from '@/sanity/lib/quesries/stabdingCommitteeQurries'


type Params = {
  memberTypeSlug: string
}

const MemberSlug = async ( ) => {



    const standingCommitteType = await getAllStandingCommittee() as SanityTypes.StandingCommitteeType[]



      
  return (
    <div className=' flex flex-col items-center justify-center'>
      <AboutBanner 
        bannerImage={aboutBannerImage.src}
        title={'Standard Committee'}
        description={'Our Standard Committee is made up of a group of individuals who are responsible for the day-to-day operations of the organization.'}
      />

<div className="container mx-auto px-4 py-8 max-w-5xl font-main font-semibold">
      <h1 className="text-3xl font-bold mb-8 text-center">Standing Committees</h1>

      {/* this is where the actual standing committee goes */}
      {/* Introduction */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Introduction</h2>
        <p className="mb-4">
          The Centre for Climate-Smart Agriculture (CCSA) at Cosmopolitan University, Abuja, is dedicated to promoting
          sustainable agricultural practices, encouraging innovation and shaping policies supporting resilience in
          climate change. To help achieve its objectives, the Centre has established five Standing Committees to provide
          guidance, strengthen collaboration and support the implementation of climate-smart and sustainable
          agricultural initiatives.
        </p>
        <p className="mb-4">
          These committees focus on key areas such as sustainability, technological advancement, entrepreneurship,
          policy advocacy and partnerships. Together, experts, researchers, industry professionals and policymakers aim
          to drive meaningful progress in agricultural systems.
        </p>
        <p className="mb-4">
          By drawing on a range of expertise, these committees will help ensure that CCSA continues to lead in research,
          innovation and capacity building. Their work will improve food security, economic development and
          environmental protection. The committees will also help equip farmers, agribusinesses and local communities
          with the knowledge, tools and techniques necessary to adopt sustainable and efficient agricultural practices.
        </p>
        <p className="mb-4">
          With a strong emphasis on collaboration and informed decision-making, the Standing Committees will serve as
          key pillars in achieving long-term agricultural resilience and sustainability in Sub-Saharan Africa and
          beyond.
        </p>
      </section>

      {/* Committee Structure and Governance */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Committee Structure and Governance</h2>
        <div className="bg-gray-50 p-6 rounded-lg">
          <p className="mb-4">
            Each Standing Committee will be overseen by a permanent staff of the Centre for Climate-Smart Agriculture
            (CCSA), who will act as Secretary. They will provide administrative support, coordinate activities, and
            ensure that the committees operate efficiently and in line with the Centre's objectives.
          </p>
          <p className="mb-4">
            Committee membership will include research fellows from CCSA, academics and researchers from Cosmopolitan
            University, partner institutions, industry, policy makers, etc. These members will contribute their
            expertise to ensure that the latest research and best practices inform the committees' work.
          </p>
          <p className="mb-4">
            A Chair or Co-Chairs will be appointed to each committee and other leadership positions as necessary. Each
            committee's leadership structure will be tailored to its specific remit and way of working, ensuring that it
            is well-placed to achieve its aims.
          </p>
        </div>
      </section>

      {/* Standing Committees of CCSA */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 border-b pb-2">Standing Committees of CCSA</h2>

        {/* Sustainable Practice Committee */}
        <div className="mb-10 bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center mb-4">
            <div className="bg-green-100 p-3 rounded-full mr-4">
              <Leaf className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold">Sustainable Practice Committee</h3>
          </div>
          <ul className="list-disc pl-6 space-y-2">
            <li>Oversees research, development and implementation of climate-smart agricultural methods.</li>
            <li>Ensures alignment with international sustainability standards and best practices.</li>
            <li>Assesses the impact of sustainable techniques on farming and the environment.</li>
          </ul>
        </div>

        {/* Emerging Technologies Committee */}
        <div className="mb-10 bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center mb-4">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <Cpu className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold">Emerging Technologies Committee</h3>
          </div>
          <ul className="list-disc pl-6 space-y-2">
            <li>Identifies, evaluates and incorporates new technologies in climate-smart agriculture.</li>
            <li>Supports the adoption of digital solutions, including precision farming and smart monitoring tools.</li>
            <li>Works with technology hubs and innovation centres to advance agricultural digital transformation.</li>
          </ul>
        </div>

        {/* Agri-Entrepreneurship Committee */}
        <div className="mb-10 bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center mb-4">
            <div className="bg-amber-100 p-3 rounded-full mr-4">
              <Briefcase className="h-8 w-8 text-amber-600" />
            </div>
            <h3 className="text-xl font-semibold">Agri-Entrepreneurship Committee</h3>
          </div>
          <ul className="list-disc pl-6 space-y-2">
            <li>Develops training programmes to support agribusiness growth.</li>
            <li>Facilitates access to finance, mentorship and business incubation for agricultural entrepreneurs.</li>
            <li>
              Strengthens connections between academia, industry and small-scale farmers to promote economic
              sustainability.
            </li>
          </ul>
        </div>

        {/* Policy and Advocacy Committee */}
        <div className="mb-10 bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center mb-4">
            <div className="bg-purple-100 p-3 rounded-full mr-4">
              <FileText className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold">Policy and Advocacy Committee</h3>
          </div>
          <ul className="list-disc pl-6 space-y-2">
            <li>Engages with policymakers to promote climate-smart agriculture at national and regional levels.</li>
            <li>Develops frameworks for incorporating climate resilience into agricultural policies.</li>
            <li>
              Raise public awareness and foster stakeholder involvement in climate adaptation and mitigation efforts.
            </li>
          </ul>
        </div>

        {/* Partnerships and Collaboration Committee */}
        <div className="mb-10 bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center mb-4">
            <div className="bg-teal-100 p-3 rounded-full mr-4">
              <Handshake className="h-8 w-8 text-teal-600" />
            </div>
            <h3 className="text-xl font-semibold">Partnerships and Collaboration Committee</h3>
          </div>
          <ul className="list-disc pl-6 space-y-2">
            <li>Builds and maintains partnerships with national and international organisations.</li>
            <li>Promotes knowledge-sharing, funding opportunities and joint research initiatives.</li>
            <li>
              Strengthens networks with governments, businesses and non-governmental organisations to maximise impact.
            </li>
          </ul>
        </div>
      </section>
    </div>
    </div>
  )
    }


export default MemberSlug