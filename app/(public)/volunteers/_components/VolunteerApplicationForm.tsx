'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useRouter } from 'next/navigation'

import {  customTrainingAction, volunteerApplicationAction } from '@/actions/trainings'
import { Gender } from '@prisma/client'
import { customTrainingSchema, VolunteerApplicationSchema } from '@/lib/schema'
import { toast } from "sonner"
import { CustomCourse, VolunteersApplication } from '@/@types'
import { Textarea } from '@/components/ui/textarea'

interface SubmitApplicationProps {
  onSubmit: (data: VolunteersApplication) => void
  onClose: () => void
}


export function VolunteerApplicationForm({ onSubmit, onClose }: SubmitApplicationProps) {
  const [isPending, setIsPending] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof VolunteerApplicationSchema>>({
    resolver: zodResolver(VolunteerApplicationSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      organization: '',
      localGovernment: '',
      state: '',
      statementOfInterest: '',
      yearsOfFarmingExperience: '',
      gender: undefined,
    },
  })

  async function handleSubmit(values: z.infer<typeof VolunteerApplicationSchema>) {
    setIsPending(true)
    try {
      let formDataToSubmit: any = { ...values };
      const data = await volunteerApplicationAction(formDataToSubmit)
      form.reset()
      onClose()
      toast("Thanks for your Request", {
        description: "Your Request has been submitted successfully.",
      })
    } catch (error) {
      console.error('Error submitting form:', error)
      toast("Error submitting form", {
        description: "An error occurred while submitting your Request. Please try again.",
      })
    } finally {
      setIsPending(false)
      router.refresh()
    }
  }

  
  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8 dark:text-orange-200">
        <div className="grid grid-cols-1 gap-4">
        <div className=" grid grid-cols-2 gap-4">
        <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className=' text-primary'>Full Name</FormLabel>
                <FormControl>
                  <Input disabled={isPending} className=' dark:border-gray-700 border-gray-200  dark:bg-dark' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
  
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className=' text-primary'>Email</FormLabel>
                <FormControl>
                  <Input disabled={isPending} className=' dark:border-gray-700 border-gray-200  dark:bg-dark' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>


          <div className=" grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className=' text-primary'>Phone</FormLabel>
                <FormControl>
                  <Input disabled={isPending} className=' dark:border-gray-700 border-gray-200  dark:bg-dark' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
            <FormField
            control={form.control}
            name="organization"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-primary'>Organization / Institution</FormLabel>
                <FormControl>
                  <Input disabled={isPending} className=' dark:border-gray-700 focus-visible:ring-0 border-gray-200 dark:bg-dark' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          </div>

      <div className=" grid grid-cols-2 gap-4">
      <FormField
            control={form.control}
            name="organization"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-primary'>Organization / Institution</FormLabel>
                <FormControl>
                  <Input disabled={isPending} className=' dark:border-gray-700 focus-visible:ring-0 border-gray-200 dark:bg-dark' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
              <FormField
            control={form.control}
            name="yearsOfFarmingExperience"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-primary'>Years of Farming Experience</FormLabel>
                <FormControl>
                  <Input disabled={isPending} className=' dark:border-gray-700 focus-visible:ring-0 border-gray-200 dark:bg-dark' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
      </div>


          <div className=" grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel className=' text-primary'>State</FormLabel>
                <FormControl>
                  <Input disabled={isPending} className=' dark:border-gray-700 border-gray-200  dark:bg-dark' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="localGovernment"
            render={({ field }) => (
              <FormItem>
                <FormLabel className=' text-primary'>localGovernment</FormLabel>
                <FormControl>
                  <Input disabled={isPending} className=' dark:border-gray-700 border-gray-200  dark:bg-dark' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          </div>

          <FormField
            control={form.control}
            name="statementOfInterest"
            render={({ field }) => (
              <FormItem>
                <FormLabel className=' text-primary'>Statement of Interest </FormLabel>
                <FormControl>
                  <Textarea disabled={isPending} className=' dark:border-gray-700 h-[200px] border-gray-200  dark:bg-dark' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className=' w-full bg-brand font-semibold ' type="submit" disabled={isPending}>
          {isPending ? 'Submitting...' : 'Submit your Application'}
        </Button>
      </form>
    </Form>
  )
}


