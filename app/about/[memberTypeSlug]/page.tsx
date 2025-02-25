import React from 'react'
import aboutBannerImage from '@/public/about-banner.jpg'
import { AboutBanner } from '../_component/AboutBanner'
// import { getAllMemberType, getSingleMemberType } from '@/sanity/lib/queries'
import { getAllMemberType, getBoardMembersWithoutPriority, getManagementMembers, getPriorityBoardMembers, getSingleMemberType } from '@/sanity/lib/quesries/membersQuesries'
import { SanityTypes } from '@/@types'
import TeamMemberCard from '../_component/team-member-card'


type Params = {
  memberTypeSlug: string
}

const MemberSlug = async ({params}: {params: Promise<Params>} ) => {
    const {memberTypeSlug} = await params
    const memberType = await getSingleMemberType(memberTypeSlug) as SanityTypes.MemberType
    const members = await getAllMemberType(memberTypeSlug) as SanityTypes.Member[]


    const managementMembers = await getManagementMembers('management-team') as SanityTypes.Member[]



    const priority = await getPriorityBoardMembers(memberTypeSlug) as SanityTypes.Member[]
    const noPriority = await getBoardMembersWithoutPriority(memberTypeSlug) as SanityTypes.Member[]




    if (memberType.slug == 'advisory-board') {
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
    
            <div className=" col-span-4 grid grid-cols-2 max-w-2xl gap-4 w-full mx-auto">
            {
              priority && priority.map((member) => (
                <TeamMemberCard key={member._id} member={member} />
              ))
            }
            </div>
            <div className=" col-span-4 grid grid-cols-3 max-w-5xl gap-4 w-full mx-auto">
            {noPriority.map((member) => (
              <TeamMemberCard key={member._id} member={member} />
            ))}
            </div>
          </div>
        </div>
          
        </div>
      )
    } else if (memberType.slug == 'management-team') {
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
      
              {
                managementMembers && managementMembers.map((member) => (
                  <TeamMemberCard key={member._id} member={member} />
                ))
              }
            </div>
          </div>
            
          </div>
        )
    } else {
      
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

        {
          priority && priority.map((member) => (
            <TeamMemberCard key={member._id} member={member} />
          ))
        }
        {members.map((member) => (
          <TeamMemberCard key={member._id} member={member} />
        ))}
      </div>
    </div>
      
    </div>
  )
    }
}

export default MemberSlug