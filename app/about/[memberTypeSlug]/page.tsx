import React from 'react'
import aboutBannerImage from '@/public/about-banner.jpg'
import { AboutBanner } from '../_component/AboutBanner'
import { console } from 'inspector'
// import { getAllMemberType, getSingleMemberType } from '@/sanity/lib/queries'
import { getAllMemberType, getSingleMemberType } from '@/sanity/lib/quesries/membersQuesries'
import { SanityTypes } from '@/@types'
import TeamMemberCard from '../_component/team-member-card'
import Image from 'next/image'


type Params = {
  memberTypeSlug: string
}

const page = async ({params}: {params: Promise<Params>} ) => {
    const {memberTypeSlug} = await params
    const memberType = await getSingleMemberType(memberTypeSlug) as SanityTypes.MemberType
    const members = await getAllMemberType(memberTypeSlug) as SanityTypes.Member[]

  return (
    <div className=' flex flex-col items-center justify-center'>
      <AboutBanner 
        bannerImage={aboutBannerImage.src}
        title={memberType.title}
        description={memberType.description}
      />
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-12">{ memberType.title  }</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {members.map((member) => (
          <TeamMemberCard key={member._id} member={member} />
        ))}
      </div>
    </div>
      
    </div>
  )
}

export default page