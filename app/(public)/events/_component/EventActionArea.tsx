'use client'

import React, { useState } from 'react'

import { Button } from "@/components/ui/button"
import { toast } from "sonner"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
// import { TrainingApplicationForm } from './EventBookingForm'
import { EventBookingForm } from './EventBookingForm'


import { SanityTypes, TrainingApplication } from '@/@types'

export function EventActionArea({
  event
}: {
    event: SanityTypes.Events
}) {
  const [homesItems, setHomeItems] = useState<SanityTypes.Events>(event)
  const [isDialogOpen, setIsDialogOpen] = useState(false)




    const HandleHomeAdd = () => {
      setIsDialogOpen(false)
      toast( "Application Submitted", {
        description: "Your application has been submitted successfully.",
      })
    }
  return (
        <Dialog>
            <DialogTrigger asChild>
            <Button className='bg-green-600 hover:bg-green-700 text-white font-medium py-4 h-full px-6 rounded-md transition duration-300'>Apply for a Taraining</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px] bg-white dark:bg-black max-h-[80%] md:max-w-xl overflow-y-auto">
            <DialogHeader>
                <DialogTitle className='py-5 flex text-center bg-green-200 dark:text-green-200 rounded-lg justify-center'>
                <p className='flex items-start text-center font-poppins text-green-600'>Apply for a Training</p>
                </DialogTitle>
            </DialogHeader>
            <EventBookingForm event={event} onSubmit={HandleHomeAdd} onClose={() => setIsDialogOpen(false)} />
            {/* <TrainingApplicationForm event={event} onSubmit={HandleHomeAdd} onClose={() => setIsDialogOpen(false)} /> */}
            </DialogContent>
        </Dialog>
  )
}

