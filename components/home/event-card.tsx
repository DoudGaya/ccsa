"use client"

import { format } from "date-fns"
import { CalendarIcon, MapPinIcon, Clock } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { useBookingModal } from "@/hooks/use-booking-modal"
import { useBookingModal } from "@/hooks/use-booking-modal"
import { SanityTypes } from "@/@types"
import { BookingModal } from "./booking-modal"
// import type { Events } from "@/types"

interface EventCardProps {
  event: SanityTypes.Events
}

export function EventCard({ event }: EventCardProps) {
  const bookingModal = useBookingModal()

  const formattedStartDate = format(new Date(event.startDate), "MMM d, yyyy")
  const formattedEndDate = format(new Date(event.endDate), "MMM d, yyyy")
  const startTime = format(new Date(event.startDate), "h:mm a")
  const endTIme = format(new Date(event.endDate), "h:mm a")
  const sameDay = formattedStartDate === formattedEndDate

  return (
    <Link href={`/events/${event.slug.current}`} className="h-full hover:bg-gray-100 rounded-lg p-3 flex flex-row items-center">
      <div className=" flex flex-col rounded-lg w-[100px] h-[100px] p-4 flex-none bg-brand/10">
       <CalendarIcon className="mr-2 h-16 w-16 text-brand" />
        <p className=" text-base text-center">{formattedStartDate}</p>
      </div>
      <div className=" hover:underline flex flex-col flex-1 px-4 py-2 space-y-2">
        <h2 className=" font-semibold "> {event.title} </h2>
        <div className="">
          <div className="items-center hidden md:flex text-sm">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {sameDay ? (
              <span>{formattedStartDate}</span>
            ) : (
              
              <div className=" flex space-y-2">
                <span>
                {formattedStartDate} - {formattedEndDate}
              </span>
            </div>
            )}
          </div>
          <div className="flex items-center text-sm">
            <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
            {sameDay ? (
              <span>{formattedStartDate}</span>
            ) : (
            <div className=" flex flex-col space-y-2">
              <span>
                {startTime} - {endTIme} ( GMT + 1 )
              </span>
            </div>
            )}
          </div>
          <div className=" flex items-center text-sm">
            <MapPinIcon className="mr-2 h-4 w-4 text-muted-foreground" />
            <span className=" line-clamp-1">
               {event.location}
            </span>
          </div>
        </div>

      </div>

    </Link>
  )
}

