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
import { VolunteerApplicationForm } from './VolunteerApplicationForm'
export function VolunteerActionArea() {

  const [isDialogOpen, setIsDialogOpen] = useState(false)




    const HandleHomeAdd = () => {
      setIsDialogOpen(false)
      toast( "Request Submitted", {
        description: "Your Requesr has been submitted successfully.",
      })
    }
  return (
        <Dialog>
            <DialogTrigger asChild>
            <Button className='bg-white border-green-700 border hover:text-white text-green-900 hover:bg-green-700 px-6 rounded-md transition font-medium duration-300'>Apply for a Volunteer </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px] bg-white dark:bg-black max-h-[80%] md:max-w-xl overflow-y-auto">
            <DialogHeader>
                <DialogTitle className='py-2 flex text-center bg-green-200 dark:text-green-200 rounded-lg justify-center'>
                <p className='flex items-start text-center font-poppins text-green-600'>Apply for a Volunteer</p>
                </DialogTitle>
            </DialogHeader>
            <VolunteerApplicationForm onSubmit={HandleHomeAdd} onClose={() => setIsDialogOpen(false)} />
            </DialogContent>
        </Dialog>
  )
}

