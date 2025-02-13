import Image from "next/image"
import { Facebook, Linkedin, Twitter } from "lucide-react"
import { SanityTypes } from "@/@types"
import Link from "next/link"
import placeHolderImage from '@/public/placeholder-img.png'


interface TeamMemberCardProps {
  member: SanityTypes.Member
}

export default function TeamMemberCard({ member }: TeamMemberCardProps) {
  return (
    <div className="bg-white dark:bg-black rounded-lg shadow-md overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105">
      <div className="relative h-[300px] w-full">
        <Image
          src={member.imageUrl || placeHolderImage.src}
          alt={member.name}
          layout="fill"
          objectFit="cover"
          className="transition-opacity border-b-2 border-blue-950 duration-300 ease-in-out group-hover:opacity-75"
        />
      </div>
      <div className="p-6">
       <Link href={`${member.memberType.slug}/${member.slug}`} >
       <p  className="text-xl hover:underline font-semibold mb-2">{member.name}</p>
        <p className="text-gray-600 hover:underline mb-4">{member.role}</p>
        <p className="text-gray-700 mb-4 hover:underline line-clamp-3">{member.bio}</p>

       </Link>
        <div className="flex space-x-4">
          {member.facebook && (
            <a
              href={member.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-500"
            >
              <Facebook size={20} />
            </a>
          )}
          {member.twitter && (
            <a
              href={member.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400"
            >
              <Twitter size={20} />
            </a>
          )}
          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-700"
            >
              <Linkedin size={20} />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

