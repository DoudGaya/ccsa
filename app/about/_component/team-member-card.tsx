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
    <div className="">
    {
        <div className=" max-w-2xl flex items-center justify-center mx-auto">
          
          <div className=" dark:bg-black rounded-lg overflow-hidden ">
  <div className=" flex flex-col space-y-3 items-center w-full">
    <Image
      src={member.imageUrl || placeHolderImage.src}
      alt={member.name}
      height={500}
      width={500}
      className={`transition-opacity ${member.priority ? 'w-[200px] h-[200px]' : 'w-[200px] h-[200px] '}  object-cover rounded-full object-[50%_25%] border-2 border-blue-950 duration-300 ease-in-out group-hover:opacity-75`}
    />
    <div className=" flex flex-col text-center space-y-0"  >
        <Link href={`${member.memberType.slug}/${member.slug}`} className="text-gray-600 font-poppins text-sm hover:underline">{member.role}</Link>
        <Link href={`${member.memberType.slug}/${member.slug}`}  className="text-xl hover:underline font-main font-bold">{member.name}</Link>
        <div className="flex items-center justify-center space-x-4">
      {member.facebook && (
        <a
          href={member.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-blue-500"
        >
          <Facebook size={18} />
        </a>
      )}
      {member.twitter && (
        <a
          href={member.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-blue-400"
        >
          <Twitter size={18} />
        </a>
      )}
      {member.linkedin && (
        <a
          href={member.linkedin}
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
    <Link href={`${member.memberType.slug}/${member.slug}`} >
      <p className="text-gray-700 mb-4 font-main hover:underline font-medium line-clamp-3">{member.bio}</p>
    </Link>
      
    </div>
  </div>
      </div>
    }
  </div>
    // <div className=" dark:bg-black rounded-lg overflow-hidden ">
    //   <div className=" flex space-x-3 items-center w-full">
    //     <Image
    //       src={member.imageUrl || placeHolderImage.src}
    //       alt={member.name}
    //       height={500}
    //       width={500}
    //       className={`transition-opacity ${member.priority ? `w-[110px] h-[110px] ${member.memberType.slug == 'management-team' && 'w-[100px] h-[100px]' }` : 'w-[100px] h-[100px]'}  object-cover rounded-full object-[50%_25%] border-2 border-blue-950 duration-300 ease-in-out group-hover:opacity-75`}
    //     />
    //     <div className=" flex flex-col space-y-0"  >
    //         <Link href={`${member.memberType.slug}/${member.slug}`} className="text-gray-600 text-sm font-poppins font-semibold hover:underline">{member.role}</Link>
    //         <Link href={`${member.memberType.slug}/${member.slug}`}  className="text-lg font-main hover:underline font-bold">{member.name}</Link>
    //         <div className="flex space-x-4">
    //       {member.facebook && (
    //         <a
    //           href={member.facebook}
    //           target="_blank"
    //           rel="noopener noreferrer"
    //           className="text-gray-400 hover:text-blue-500"
    //         >
    //           <Facebook size={18} />
    //         </a>
    //       )}
    //       {member.twitter && (
    //         <a
    //           href={member.twitter}
    //           target="_blank"
    //           rel="noopener noreferrer"
    //           className="text-gray-400 hover:text-blue-400"
    //         >
    //           <Twitter size={18} />
    //         </a>
    //       )}
    //       {member.linkedin && (
    //         <a
    //           href={member.linkedin}
    //           target="_blank"
    //           rel="noopener noreferrer"
    //           className="text-gray-400 hover:text-blue-700"
    //         >
    //           <Linkedin size={18} />
    //         </a>
    //       )}
    //     </div>
    //     </div>
    //   </div>
    //   <div className="py-6">
    //    <Link href={`${member.memberType.slug}/${member.slug}`} >
    //     <p className="text-gray-700 mb-4 font-main hover:underline font-medium line-clamp-3">{member.bio}</p>
    //    </Link>
        
    //   </div>
    // </div>
  )
}

