'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useRouter } from 'next/navigation'
// import { homeSchema } from '@/lib/schema'
import { applicationSchema } from '@/sanity/lib/zod/schemas'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
// import { uploadFileToS3 } from '@/actions/amazon-s3'
import { useToast } from '@/hooks/use-toast'
// import { createHomeAction } from '@/actions/homes'
import { createApplication } from '@/actions/trainings'
import { SanityTypes, TrainingApplication } from '@/@types'
import { Gender } from '@prisma/client'
import Link from 'next/link'

interface SubmitApplicationProps {
  onSubmit: (data: TrainingApplication) => void
  onClose: () => void
  trainings: SanityTypes.Trainings[]
}


export function TrainingApplicationForm({ onSubmit, onClose, trainings }: SubmitApplicationProps) {
  const [isPending, setIsPending] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof applicationSchema>>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      firstName: '',
      middleName: '',
      lastName: '',
      email: '',
      phone: '',
      organization: '',
      gender: undefined,
      age: '',
      // gender: undefined,
      role: '',
      training: '',
    },
  })

  async function handleSubmit(values: z.infer<typeof applicationSchema>) {
    setIsPending(true)
    try {
      let formDataToSubmit: any = { ...values };
      const data = await createApplication(formDataToSubmit)

      if (data.error) {
        throw new Error(data.error)
      }

      const redirectUrl = data.redirectUrl || "/trainings"
      setSubmitted(true)
      setSuccessMessage("Your application was submitted successfully. We will review it and get back to you shortly.")
      form.reset()
      onSubmit(data.application as TrainingApplication)
      toast({
        title: "Application submitted",
        description: "We have received your application and will review it shortly.",
      })

      router.push(redirectUrl)
      onClose()
    } catch (error) {
      console.error('Error submitting form:', error)
      toast({
        title: "Error submitting form",
        description: "An error occurred while submitting your application. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsPending(false)
      router.refresh()
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-6 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-700">
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-7 w-7 fill-none stroke-current stroke-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-semibold text-green-950">Application received</h3>
        <p className="mt-2 text-sm text-green-900">{successMessage}</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild className="bg-brand font-semibold">
            <Link href="/trainings">Return to trainings</Link>
          </Button>
          <Button variant="outline" onClick={() => setSubmitted(false)}>
            Submit another application
          </Button>
        </div>
      </div>
    )
  }

  
  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8 dark:text-orange-200">
        <div className="grid grid-cols-1 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className=' text-primary'>First Name</FormLabel>
                <FormControl>
                  <Input disabled={isPending} className=' dark:border-gray-700 border-gray-200  dark:bg-dark' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

            <FormField
            control={form.control}
            name="middleName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className=' text-primary'>Middle Name</FormLabel>
                <FormControl>
                  <Input disabled={isPending} className=' dark:border-gray-700 border-gray-200  dark:bg-dark' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

            <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className=' text-primary'>LastName</FormLabel>
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
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel className=' text-primary'>Age</FormLabel>
                <FormControl>
                  <Input disabled={isPending} className=' dark:border-gray-700 border-gray-200  dark:bg-dark' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
            <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-primary'>Role</FormLabel>
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
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel className=' text-primary'>Gender</FormLabel>
                <FormControl>
                  <Select disabled={isPending} onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className=' dark:border-gray-700 border-gray-200  dark:bg-dark text-primary active:border-primary'>
                        <SelectValue placeholder="Select Gender" />
                      </SelectTrigger>
                      <SelectContent>
                            <SelectItem value={Gender.Male}>Male</SelectItem>
                            <SelectItem value={Gender.Female}>Female</SelectItem>
                      </SelectContent>
                    </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

        <FormField
            control={form.control}
            name="training"
            render={({ field }) => (
              <FormItem>
                <FormLabel className=' text-primary'>Program</FormLabel>
                <FormControl>
                  <Select disabled={isPending} onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className=' dark:border-gray-700 border-gray-200  dark:bg-dark text-primary active:border-primary'>
                        <SelectValue placeholder="Select Prefered Training" />
                      </SelectTrigger>
                      <SelectContent>
                            {
                              trainings.map((training) => (
                                <SelectItem key={training._id} value={training.title}>{training.title}</SelectItem>
                              ))
                            }
                      </SelectContent>
                    </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

       
      </div>
        </div>
        <Button className=' w-full bg-brand font-semibold ' type="submit" disabled={isPending}>
          {isPending ? 'Submitting...' : 'Submit your Application'}
        </Button>
      </form>
    </Form>
  )
}


