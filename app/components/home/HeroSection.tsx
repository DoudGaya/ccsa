'use client'

import Image from 'next/image'
import AnimatedText from './AnimatedText'
import TextCarousel from './TextCarousel'
import heroImage from '@/public/home-bannner.jpg'
import Link from 'next/link'
import logo from '@/app/assets/img/cosmopolitan-logo.png'

export default function HeroSection() {
  const heroTexts = [
    "Innovate with Us",
    "Transforming Agriculture, Sustaining the Future",
    'Empowering resilient, sustainable, and climate-smart agricultural systems for a better tomorrow.'
  ]
  
    return (
      <div className="relative min-h-screen flex bg-gray-100 dark:bg-black items-center justify-center overflow-hidden">
        <Image
          src={heroImage}
          alt="Hero Background"
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
        />
        <div className="absolute inset-0 bg-black opacity-50" />
        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8">
        <div className=" flex items-center justify-center">
                <Image src={logo} alt='Cosmopolitan University Abuja' className=' h-36 px-0 object-left max-w-min  object-contain ' width={120} height={120} />
        </div>
          <AnimatedText 
            text="Centre for Climate-Smart Agriculture (CCSA) Cosmopolitan University Abuja" 
            className="text-3xl sm:text-4xl  md:text-5xl lg:text-6xl xl:text-6xl font-bold  break-words"
          />
          <TextCarousel 
            texts={heroTexts} 
            className="text-xl sm:text-2xl md:text-2xl lg:text-2xl break-words"
          />
          <div className=" w-full flex justify-center space-x-4 mt-8">
            <Link href={'/about-us'} className="px-6 space-x-3 group items-center py-3 flex  ease-in-out delay-150 duration-150 hover:bg-[rgb(0,58,103)] hover:text-white  bg-white text-black rounded-lg font-medium transition-all">
                {/* <span className=' hidden group-hover:block transition-all  transform ease-in-out'> Learn More</span> */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                    <path fillRule="evenodd" d="M2 10a.75.75 0 0 1 .75-.75h12.59l-2.1-1.95a.75.75 0 1 1 1.02-1.1l3.5 3.25a.75.75 0 0 1 0 1.1l-3.5 3.25a.75.75 0 1 1-1.02-1.1l2.1-1.95H2.75A.75.75 0 0 1 2 10Z" clipRule="evenodd" />
                </svg>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  