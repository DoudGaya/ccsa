'use client'
import Link from 'next/link'
import { Facebook, Twitter, LinkedinIcon as LinkedIn, Instagram } from 'lucide-react'
import useInvalidPathName from '@/lib/use-invalid-path'
import { ModeToggle } from './dark-button'

const socialLinks = [
  {
    name: 'Facebook',
    url: 'https://web.facebook.com/profile.php?id=61550571397019',
    icon:  <Facebook size={20} />
  },
  {
    name: 'Twitter',
    url: 'https://x.com/cosmouniversity',
    icon:<Twitter size={20} />
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/cosmo_university/',
    icon: <LinkedIn size={20} />
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/company/cosmopolitan-university',
    icon: <Instagram size={20} />
  },
]


export default function Footer() {
  const isInvalidPath = useInvalidPathName()
  if (isInvalidPath) return <></>

  return (
    <footer className="bg-brand pt-16 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About CCSA</h3>
            <p className="text-sm text-gray-300">
              The Centre for Climate-Smart Agriculture (CCSA) at Cosmopolitan University, Abuja, 
              fosters resilience, sustainability, and innovation in agricultural systems to address 
              climate change challenges. 
            </p>
             <div className=" my-3">
              <p className="">
              No. 1 Masarki Close, Parakou street, Wuse II Abuja
            </p>
             </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm hover:text-green-400 transition-colors">Research Labs</Link></li>
              <li><Link href="/innovation/agri-tech-tools" className="text-sm hover:text-green-400 transition-colors">Digital Innovation Hub</Link></li>
              <li><Link href="/contact" className="text-sm hover:text-green-400 transition-colors">Contact Us</Link></li>
              <li><Link href="/innovation/farmer-incubation" className="text-sm hover:text-green-400 transition-colors">Farmer Incubation Program</Link></li>
              {/* <li><Link href="/knowledge-hub" className="text-sm hover:text-green-400 transition-colors">Knowledge Hub</Link></li> */}
              <li><Link href="/resources/agri-institutions" className="text-sm hover:text-green-400 transition-colors">Agri- Institutions</Link></li>
              <li><Link href="/auth/signin" className="text-sm hover:text-green-400 transition-colors">Staff Login</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-sm text-gray-300 mb-2">Cosmopolitan University, Abuja</p>
            <p className="text-sm text-gray-300 mb-4">Email: ccsa@cosmopolitan.edu.ng</p>
           
            <div className="flex space-x-4">
              {
                socialLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-green-400 transition-colors"
                  >
                    {link.icon}
                  </Link>
                ))
              }
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

