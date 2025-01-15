'use client'
import Link from 'next/link'
import { Facebook, Twitter, LinkedinIcon as LinkedIn, Instagram } from 'lucide-react'
import { ModeToggle } from './dark-button'

export default function Footer() {
  return (
    <footer className="bg-brand pt-20 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About CCSA</h3>
            <p className="text-sm text-gray-300">
              The Centre for Climate-Smart Agriculture (CCSA) at Cosmopolitan University, Abuja, 
              fosters resilience, sustainability, and innovation in agricultural systems to address 
              climate change challenges.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm hover:text-green-400 transition-colors">Research Labs</Link></li>
              <li><Link href="#" className="text-sm hover:text-green-400 transition-colors">Digital Innovation Hub</Link></li>
              <li><Link href="#" className="text-sm hover:text-green-400 transition-colors">Farmer Incubation Program</Link></li>
              <li><Link href="#" className="text-sm hover:text-green-400 transition-colors">Knowledge Repository</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Partners</h3>
            <ul className="space-y-2">
              <li><Link href="https://www.ifad.org/" className="text-sm hover:text-green-400 transition-colors">IFAD</Link></li>
              <li><Link href="https://agra.org/" className="text-sm hover:text-green-400 transition-colors">AGRA</Link></li>
              <li><Link href="https://www.afdb.org/" className="text-sm hover:text-green-400 transition-colors">AfDB</Link></li>
              <li><Link href="http://www.fao.org/" className="text-sm hover:text-green-400 transition-colors">FAO</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-sm text-gray-300 mb-2">Cosmopolitan University, Abuja</p>
            <p className="text-sm text-gray-300 mb-4">Email: ccsa@cosmopolitan.edu.ng</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <LinkedIn size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t flex justify-between border-green-800">
          <p className="text-center text-sm text-gray-300">
            © {new Date().getFullYear()} Centre for Climate-Smart Agriculture, Cosmopolitan University. All rights reserved.
          </p>

          <ModeToggle />
        </div>
      </div>
    </footer>
  )
}

