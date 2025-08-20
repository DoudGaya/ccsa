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
import PublicBanners from '@/app/components/PublicBanners'


type Params = {
  memberTypeSlug: string
}

const MemberSlug = async ({params}: {params: Promise<Params>} ) => {
  
  const resolvedParams = await params;
  console.log("🔍 Raw params:", resolvedParams);
  console.log("🔍 memberTypeSlug:", resolvedParams.memberTypeSlug);
  
  if (!resolvedParams.memberTypeSlug) {
    console.log("❌ No memberTypeSlug found, returning notFound");
    return notFound()
  }
  
  const {memberTypeSlug} = resolvedParams;
  console.log("✅ Processing memberTypeSlug:", memberTypeSlug);

  try {
    console.log("📡 Fetching data for:", memberTypeSlug);
    
    const memberType = await getSingleMemberType(memberTypeSlug) as SanityTypes.MemberType;
    console.log("📋 MemberType result:", memberType);
    
    if (!memberType || !memberType.slug) {
      console.log("❌ No memberType found for slug:", memberTypeSlug);
      // Let's show a fallback page instead of 404 for debugging
      return (
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-2xl font-bold text-red-600">Debug: Member Type Not Found</h1>
          <p>Searched for slug: <code>{memberTypeSlug}</code></p>
          <p>Result: <code>{JSON.stringify(memberType)}</code></p>
        </div>
      );
    }
    
    const members = await getAllMemberType(memberTypeSlug) as SanityTypes.Member[];
    const managementMembers = await getManagementMembers('management-team') as SanityTypes.Member[];
    const priority = await getPriorityBoardMembers(memberTypeSlug) as SanityTypes.Member[];
    const noPriority = await getBoardMembersWithoutPriority(memberTypeSlug) as SanityTypes.Member[];

    console.log("📊 Data loaded:", {
      memberType: memberType?.slug,
      membersCount: members?.length || 0,
      managementMembersCount: managementMembers?.length || 0,
      priorityCount: priority?.length || 0,
      noPriorityCount: noPriority?.length || 0
    });

    if (memberType.slug == 'advisory-board') {
      return (
        <div className=' flex flex-col items-center justify-center'>
          <PublicBanners title={memberType.title} message={memberType.description} />
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-12">{ memberType.title  }</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
    
            <div className=" col-span-4 grid grid-cols-1 md:grid-cols-2 max-w-5xl gap-4 w-full mx-auto">
            {
              priority && priority.map((member) => (
                <TeamMemberCard key={member._id} member={member} />
              ))
            }
            </div>
            <div className=" col-span-4 grid grid-cols-1 md:grid-cols-3 max-w-7xl gap-4 w-full mx-auto">
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
            {/* <AboutBanner 
              bannerImage={aboutBannerImage.src}
              title={memberType.title}
              description={memberType.description}
            /> */}

            <PublicBanners title={memberType.title} message={memberType.description} />
          <div className="container mx-auto px-4 py-16">
            <h2 className="text-3xl font-bold text-center mb-12">{ memberType.title  }</h2>
            <div className="flex flex-col">
              <div className="col-span-3">
                {
                    <div className=" max-w-2xl flex items-center justify-center mx-auto">
                      
                      <div className=" dark:bg-black rounded-lg overflow-hidden ">
              <div className=" flex flex-col space-y-3 items-center w-full">
                <Image
                  src={managementMembers[0].imageUrl || placeHolderImage.src}
                  alt={managementMembers[0].name}
                  height={500}
                  width={500}
                  className={`transition-opacity ${managementMembers[0].priority ? 'w-[200px] h-[200px]' : 'w-[100px] h-[100px] '}  object-cover rounded-full object-[50%_25%] border-2 border-blue-950 duration-300 ease-in-out group-hover:opacity-75`}
                />
                <div className=" flex flex-col text-center space-y-0"  >
                    <Link href={`${managementMembers[0].memberType.slug}/${managementMembers[0].slug}`} className="text-gray-600 hover:underline">{managementMembers[0].role}</Link>
                    <Link href={`${managementMembers[0].memberType.slug}/${managementMembers[0].slug}`}  className="text-xl hover:underline font-semibold">{managementMembers[0].name}</Link>
                    <div className="flex items-center justify-center space-x-4">
                  {managementMembers[0].facebook && (
                    <a
                      href={managementMembers[0].facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-blue-500"
                    >
                      <Facebook size={18} />
                    </a>
                  )}
                  {managementMembers[0].twitter && (
                    <a
                      href={managementMembers[0].twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-blue-400"
                    >
                      <Twitter size={18} />
                    </a>
                  )}
                  {managementMembers[0].linkedin && (
                    <a
                      href={managementMembers[0].linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-blue-700"
                    >
                      <Linkedin size={18} />
                    </a>
                  )}
                </div>
                </div>
              </div>
                <div className="py-6 text-center">
                <Link href={`${managementMembers[0].memberType.slug}/${managementMembers[0].slug}`} >
                  <p className="text-gray-700 mb-4 font-main hover:underline font-medium line-clamp-3">{managementMembers[0].bio}</p>
                </Link>
                  
                </div>
              </div>
                  </div>
                }
              </div>
      
             <div className=" grid grid-cols-1 md:grid-cols-3">
             {
                managementMembers && managementMembers.slice(1, managementMembers.length).map((member) => (
                  <TeamMemberCard key={member._id} member={member} />
                ))
              }
             </div>
            </div>
          </div>
            
          </div>
        )
    } else {
      
  return (
    <div className=' flex flex-col items-center justify-center'>
      {/* <AboutBanner 
        bannerImage={aboutBannerImage.src}
        title={memberType.title}
        description={memberType.description}
      /> */}
      <PublicBanners title={memberType.title} message={memberType.description} />
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-12">{ memberType.title  }</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

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
  } catch (error) {
    console.error("❌ Error loading data for memberTypeSlug:", memberTypeSlug, error);
    return (
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-2xl font-bold text-red-600">Error Loading Page</h1>
        <p>Slug: <code>{memberTypeSlug}</code></p>
        <p>Error: <code>{error instanceof Error ? error.message : 'Unknown error'}</code></p>
      </div>
    );
  }
}

export default MemberSlug