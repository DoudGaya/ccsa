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
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="line-clamp-2">{event.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="space-y-3 mb-4">
          <div className="flex items-center text-sm">
            <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
            {sameDay ? (
              <span>{formattedStartDate}</span>
            ) : (
            <div className=" flex flex-col space-y-2">
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
          <div className="flex items-center text-sm">
            <MapPinIcon className="mr-2 h-4 w-4 text-muted-foreground" />
            <span className=" line-clamp-1">
              {/* {event.venue}, */}    
               {event.location} | Hybrid
            </span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{event.description}</p>
        <div className="flex flex-wrap gap-2">
          {event.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end items-end border-t pt-3">
        {/* <BookingModal /> */}
        <Link href={`/events/${event.slug.current}`} className="text-sm bg-brand text-white px-3 py-2 rounded-md font-medium text-primary">
          Learn More
        </Link>
      </CardFooter>
    </Card>
  )
}

