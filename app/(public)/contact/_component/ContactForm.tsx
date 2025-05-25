import React from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { submitContactForm } from '@/actions/contact'
import { useToast } from '@/hooks/use-toast'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"




const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters long"),
})
type FormData = z.infer<typeof schema>


const ContactForm = () => {

  
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const { toast } = useToast()
  
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
  
      try {
        const result = await submitContactForm(formData)
  
        if (result.success) {
          setIsSuccess(true)
          toast({
            title: "Message Sent Successfully",
            description: "Thank you for contacting us. We'll respond to your inquiry soon.",
          })
          reset()
  
          // Reset success message after 5 seconds
          setTimeout(() => {
            setIsSuccess(false)
          }, 5000)
        } else {
          toast({
            title: "Error",
            description: "There was a problem submitting your form. Please try again.",
            variant: "destructive",
          })
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "An unexpected error occurred. Please try again later.",
          variant: "destructive",
        })
      } finally {
        setIsSubmitting(false)
      }
    }
  

  return (
    <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6 md:p-8">
    <h2 className="text-2xl font-bold mb-6 text-green-700">Send Us a Message</h2>

    {isSuccess ? (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-green-100 p-3 rounded-full">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <h3 className="text-xl font-semibold mb-2">Message Sent Successfully!</h3>
        <p className="text-gray-700">
          Thank you for contacting us. We'll respond to your inquiry as soon as possible.
        </p>
      </div>
    ) : (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Your Name
            </label>
            <Input
              id="name"
              {...register("name")}
              placeholder="Enter your full name"
              className={`${errors.name ? "border-red-500" : ""} h-11`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email Address
            </label>
            <Input
              id="email"
              {...register("email")}
              type="email"
              placeholder="Enter your email address"
              className={`${errors.email ? "border-red-500" : ""} h-11`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>
        </div>
        <div>
          <label htmlFor="subject" className="block text-sm font-medium mb-1">
            Subject
          </label>
          <Input
            id="subject"
            {...register("subject")}
            placeholder="What is your message about?"
            className={`${errors.subject ? "border-red-500" : ""} h-11`}
          />
          {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>}
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-1">
            Message
          </label>
          <Textarea
            id="message"
            {...register("message")}
            placeholder="Please provide details about your inquiry..."
            className={`min-h-[150px] ${errors.message ? "border-red-500" : ""}`}
          />
          {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
        </div>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-12 bg-green-700 hover:bg-green-800 text-white font-medium flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
              <span>Sending...</span>
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              <span>Send Message</span>
            </>
          )}
        </Button>
      </form>
    )}
  </div>

  )
}

export default ContactForm