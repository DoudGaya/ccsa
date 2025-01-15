"use client"

import * as React from "react"
import Link from "next/link"
import { Menu } from 'lucide-react'

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const aboutItems = [
  { title: "Vision & Mission", href: "/about/vision-mission" },
  { title: "Objectives", href: "/about/objectives" },
  { title: "Partnerships", href: "/about/partnerships" },
]

const researchItems = [
  { title: "Climate-Smart Technologies", href: "/research/climate-smart-tech" },
  { title: "Sustainable Irrigation", href: "/research/sustainable-irrigation" },
  { title: "Hybrid Crops", href: "/research/hybrid-crops" },
]

const innovationItems = [
  { title: "Digital Platforms", href: "/innovation/digital-platforms" },
  { title: "Agri-tech Tools", href: "/innovation/agri-tech-tools" },
  { title: "Farmer Incubation", href: "/innovation/farmer-incubation" },
]

export function MobileNavMenu() {
  const [open, setOpen] = React.useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="px-0 flex-none text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden">
          <Menu className="h-12 stroke-white size-12 w-12" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0 px-6">
        <SheetTitle className="text-left">Navigation</SheetTitle>
        <MobileLink href="/" className="flex items-center" onOpenChange={setOpen}>
          <span className="font-bold">CCSA</span>
        </MobileLink>
        <Accordion type="multiple" className="w-full">
          <AccordionItem value="about">
            <AccordionTrigger>About CCSA</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col space-y-4">
                {aboutItems.map((item) => (
                  <MobileLink key={item.href} href={item.href} className=" py-2" onOpenChange={setOpen}>
                    {item.title}
                  </MobileLink>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="research">
            <AccordionTrigger>Research</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col space-y-2">
                {researchItems.map((item) => (
                  <MobileLink key={item.href} href={item.href} onOpenChange={setOpen}>
                    {item.title}
                  </MobileLink>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="innovation">
            <AccordionTrigger>Innovation Hub</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col space-y-2">
                {innovationItems.map((item) => (
                  <MobileLink key={item.href} href={item.href} onOpenChange={setOpen}>
                    {item.title}
                  </MobileLink>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className="flex flex-col space-y-2 mt-4">
          <MobileLink href="/knowledge-hub" onOpenChange={setOpen}>
            Knowledge Hub
          </MobileLink>
          <MobileLink href="/contact" onOpenChange={setOpen}>
            Contact
          </MobileLink>
        </div>
      </SheetContent>
    </Sheet>
  )
}

interface MobileLinkProps extends React.PropsWithChildren {
  href: string
  onOpenChange?: (open: boolean) => void
  className?: string
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
}: MobileLinkProps) {
  return (
    <Link
      href={href}
      onClick={() => {
        onOpenChange?.(false)
      }}
      className={className}
    >
      {children}
    </Link>
  )
}

