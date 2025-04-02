'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Textarea } from '@/components/ui/textarea'
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

interface SubmitApplicationProps {
  onSubmit: (data: TrainingApplication) => void
  onClose: () => void
  training: SanityTypes.Trainings
}


export function SingleTrainingApplicationForm({ onSubmit, onClose, training }: SubmitApplicationProps) {
  const [isPending, setIsPending] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof applicationSchema>>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      organization: '',
      gender: undefined,
      age: '',
      // gender: undefined,
      role: '',
      training: training.slug,
    },
  })

  async function handleSubmit(values: z.infer<typeof applicationSchema>) {
    setIsPending(true)
    try {
      let formDataToSubmit: any = { ...values };
      const data = await createApplication(formDataToSubmit)
      // onSubmit(data.application as TrainingApplication)
      form.reset()
      onClose()
      toast({
        title: "Thanks for your Application",
        description: "Your application has been submitted successfully.",
      })
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

  
  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8 dark:text-orange-200">
        <div className="grid grid-cols-1 gap-4">
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
                <FormLabel className=' text-primary'>Status</FormLabel>
                <FormControl>
                  <Select disabled={isPending} onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className=' dark:border-gray-700 border-gray-200  dark:bg-dark text-primary active:border-primary'>
                        <SelectValue placeholder="Select Home Status" />
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
        {/* <FormField
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
          /> */}
      </div>
        </div>
        <Button className=' w-full bg-brand font-semibold ' type="submit" disabled={isPending}>
          {isPending ? 'Submitting...' : 'Submit your Application'}
        </Button>
      </form>
    </Form>
  )
}


