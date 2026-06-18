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
  const [formError, setFormError] = useState<{ type: 'duplicate' | 'general'; message: string } | null>(null)
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
    setFormError(null)
    try {
      let formDataToSubmit: any = { ...values };
      const data = await createApplication(formDataToSubmit)

      if (data.error === 'duplicate') {
        setFormError({ type: 'duplicate', message: (data as any).errorMessage })
        return
      }

      if (data.error) {
        setFormError({ type: 'general', message: data.error })
        return
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
      setFormError({ type: 'general', message: 'An unexpected error occurred. Please try again.' })
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
        {formError && (
          <div className={`flex gap-3 rounded-lg border px-4 py-3 ${
            formError.type === 'duplicate'
              ? 'border-amber-300 bg-amber-50 text-amber-900'
              : 'border-red-300 bg-red-50 text-red-900'
          }`}>
            <div className="mt-0.5 shrink-0">
              {formError.type === 'duplicate' ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 text-amber-500">
                  <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 text-red-500">
                  <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <div className="space-y-1">
              <p className="text-sm font-semibold">
                {formError.type === 'duplicate' ? 'Application already submitted' : 'Submission failed'}
              </p>
              <p className="text-sm">{formError.message}</p>
            </div>
          </div>
        )}
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


