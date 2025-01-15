'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import logo from '@/app/assets/img/ccsa-logo.png'
import Image from 'next/image'
import { NavMenu } from './NavigationMenu'



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
            <Image src={logo} alt='Cosmopolitan University Abuja' className=' h-12 px-0 object-left max-w-min  object-contain ' width={300} height={300} />
          </Link>
            <NavMenu />
        </div>
      </div>
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


