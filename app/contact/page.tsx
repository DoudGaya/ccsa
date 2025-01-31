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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>
        <div className="space-y-8">
          <div className="h-64 md:h-96 rounded-lg overflow-hidden">
            {/* <Map /> */}
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <MapPin className="text-blue-500" />
              <span>123 Main St, Abuja, Nigeria</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="text-blue-500" />
              <span>+234 123 456 7890</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="text-blue-500" />
              <span>contact@example.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default ContactPage