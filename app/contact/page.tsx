"use client"
import React from 'react'
import PublicBanners from '../components/PublicBanners'

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { submitContactForm } from '@/actions/contact'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from '@/hooks/use-toast'
import { MapPin, Phone, Mail } from "lucide-react"

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters long"),
})

type FormData = z.infer<typeof schema>

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { 
    toast 
  } = useToast()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })


  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => formData.append(key, value))

    const result = await submitContactForm(formData)
    setIsSubmitting(false)

    if (result.success) {
      toast({
        title: "Success",
        description: result.message,
      })
      reset()
    } else {
      toast({
        title: "Error",
        description: "There was a problem submitting your form. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div>
      <PublicBanners title='Contact Us' message='to be done...' />
      <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Input {...register("name")} placeholder="Your Name" className={errors.name ? "border-red-500" : ""} />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <Input
                {...register("email")}
                type="email"
                placeholder="Your Email"
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <Input
                {...register("subject")}
                placeholder="Subject"
                className={errors.subject ? "border-red-500" : ""}
              />
              {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>}
            </div>
            <div>
              <Textarea
                {...register("message")}
                placeholder="Your Message"
                className={`h-32 ${errors.message ? "border-red-500" : ""}`}
              />
              {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
            </div>
            <Button type="submit" disabled={isSubmitting} className="w-full bg-blue-900">
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>
        <div className="space-y-8 col-span-2 flex items-center justify-center">
          <div className=" grid grid-cols-3 gap-6  items-center justify-center">
            <div className=" text-center py-20 bg-white justify-center px-3 drop-shadow-md rounded-xl h-full items-center flex flex-col space-x-2">
              <MapPin size={30} className="text-blue-500" />
              <span className=' text-sm font-poppins'>Plot 432, Yakubu J. Pam Street, Opposite National Hospital, Central Business District, Abuja</span>
            </div>
            <div className=" text-center py-6 bg-white justify-center px-3 drop-shadow-md rounded-xl h-full items-center flex flex-col space-x-2">
              <Phone size={30} className="text-blue-500" />
              <span className=' text-sm font-poppins'>(+234) 803 550 2270</span>
            </div>
            <div className=" text-center py-6 bg-white justify-center px-3 drop-shadow-md rounded-xl h-full items-center flex flex-col space-x-2">
              <Mail size={30} className="text-blue-500" />
              <span className=' text-sm font-poppins'>ccsa@cosmopolitan.edu.ng</span>
            </div>
          </div>
        </div>
        
      </div>
    </div>
    </div>
  )
}

export default ContactPage