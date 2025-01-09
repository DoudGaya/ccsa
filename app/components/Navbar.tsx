'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import logo from '@/app/assets/img/ccsa-logo.png'
import Image from 'next/image'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"



export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { scrollY } = useScroll()

  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(59, 130, 246, 0)', 'rgba(6,54,100)']
  )

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-2' : 'py-4'
      }`}
      style={{ backgroundColor }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-white text-2xl font-bold">
          {/* <span className=' text-white'>CCSA</span> */}
            <Image src={logo} alt='Cosmopolitan University Abuja' className=' h-12 px-0 object-left max-w-min  object-contain ' width={300} height={300} />
          </Link>
          <div className="hidden md:flex space-x-8">
          {/* <NavigationMenu>
            <NavigationMenuList className=''>
            </NavigationMenuList>
          </NavigationMenu> */}
            <NavLink href="/">Home</NavLink>
            <NavLink href="/about-us">About</NavLink>
            <NavLink href="/news">News</NavLink>
            <NavLink href="/contact">Contact</NavLink>
          </div>
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden absolute top-full left-0 right-0 px-6 py-4"
          >
            <div className="container mx-auto flex space-y-6 px-4 bg-[rgb(6,54,103)] py-10 rounded-xl flex-col">
              <NavLink href="/" onClick={() => setIsMobileMenuOpen(false)}>Home</NavLink>
              <NavLink href="/about-us" onClick={() => setIsMobileMenuOpen(false)}>About</NavLink>
              <NavLink href="/news" onClick={() => setIsMobileMenuOpen(false)}>News</NavLink>
              <NavLink href="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</NavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

function NavLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) {
  return (
    <Link href={href} className="text-white hover:text-gray-200 transition-colors" onClick={onClick}>
      {children}
    </Link>
  )
}


