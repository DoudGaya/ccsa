import React from 'react'
import { AboutBanner } from '../../_component/AboutBanner'
// import { getSingleMember } from '@/sanity/lib/queries'
import { getSingleMember } from '@/sanity/lib/quesries/membersQuesries'

import { SanityTypes } from '@/@types'
// import { Card, } from '@/components/Card'#
import Image from 'next/image'
import aboutBannerImage from '@/public/about-banner.jpg'
import { Facebook, Linkedin, Twitter } from "lucide-react"
import { PortableText } from 'next-sanity'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle  } from '@/components/ui/card'

import { TeamBanner } from '../../_component/TeamBanner'
import PublicBanners from '@/app/components/PublicBanners'

type Params = {
  member: string
} 
const page = async ( {params}: {params: Promise<Params>}) => {


  const { member } = await params

  const user = await getSingleMember(member) as SanityTypes.Member

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <PublicBanners title={user.name} message={user.role} />

    <div className="max-w-7xl -mt-[100px]  flex flex-col mx-auto px-4 sm:px-6 lg:px-8">
      <div className="">
          <Image
            src={user.imageUrl}
            alt={user.name}
            width={200}
            height={200}
            className="rounded-full border-primary border-2 bg-white object-cover object-center overflow-hidden h-[200px] w-[200px]"
          />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            {/* <CardContent> */}
                   {/* <article className=" lg:prose-lg dark:prose-invert font-main text-lg space-y-6">
                    <PortableText 
                    // @ts-ignore
                    value={user.body} />
                   </article> */}
              <p className="text-gray-600 font-main whitespace-pre-wrap">{user.bio}</p>
            {/* </CardContent> */}
         
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-semibold">Email</p>
                <p className="text-gray-600">{user.email}</p>
              </div>
              <div>
                <p className="font-semibold">Member Type</p>
                <Badge variant="secondary">{user.memberType.title}</Badge>
              </div>
              <div className="space-y-2">
                <Button asChild variant="outline" className="w-full">
                  <a href={user.linkedin} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
                  </a>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <a href={user.twitter} target="_blank" rel="noopener noreferrer">
                    <Twitter className="mr-2 h-4 w-4" /> Twitter
                  </a>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <a href={user.facebook} target="_blank" rel="noopener noreferrer">
                    <Facebook className="mr-2 h-4 w-4" /> Facebook
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </div>
  )
}

export default page