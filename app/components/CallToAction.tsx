"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import banner from "@/public/home-bannner.jpg"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"

export function CallToAction() {
  const [isOpen, setIsOpen] = useState(false)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setIsOpen(false)
  }

  return (
    <section
      style={{
        backgroundImage: `url(${banner.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    className=" h-[70vh] flex items-center py-20 bg-brand bg-blend-overlay opacity-76 text-white">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4 text-r">Ready to Transform Agriculture?</h2>
        <p className="text-xl mb-8 text-r">Join us in our mission to create climate-smart farming solutions.</p>


        <Link href="/contact" className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white font-medium py-4 px-6 rounded-md transition duration-300">
          Send us a Message 
        </Link>
        {/* <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button size="lg">Send Us a Message</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Contact Us</DialogTitle>
              <DialogDescription>
                Send us a message and we'll get back to you as soon as possible.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Your email" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Your message" required />
              </div>
              <Button type="submit" className="w-full">Submit</Button>
            </form>
          </DialogContent>
        </Dialog> */}
      </div>
    </section>
  )
}

