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

import { SanityTypes } from '@/@types'
import EventBookingModal from '@/components/EventBookingModal'

export function EventActionArea({
  event
}: {
    event: SanityTypes.Events
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleClose = () => {
    setIsDialogOpen(false)
    toast("Application Submitted", {
      description: "Your application has been submitted successfully.",
    })
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className='bg-green-600 hover:bg-green-700 text-white font-medium py-4 h-full px-6 rounded-md transition duration-300'>
          Book a Spot
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] bg-white dark:bg-black max-h-[80%] md:max-w-xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className='py-5 flex text-center bg-green-200 dark:text-green-200 rounded-lg justify-center'>
            <p className='flex items-start text-center font-poppins text-green-600'>Book a spot</p>
          </DialogTitle>
        </DialogHeader>
        <EventBookingModal 
          eventName={event.title || event.slug.current} 
          onClose={() => setIsDialogOpen(false)} 
        />
      </DialogContent>
    </Dialog>
  )
}

