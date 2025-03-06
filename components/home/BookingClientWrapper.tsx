"use client"

import { useBookingModal } from "@/hooks/use-booking-modal"
import { useEffect, useState } from "react"
import { SanityTypes } from "@/@types"
import { Button } from "@/components/ui/button"


export default function BookingClientWrapper({ eventId, events }: { eventId: string, events: SanityTypes.Events[] }) {
  const bookingModal = useBookingModal()
  const [event, setEvent] = useState<SanityTypes.Events | null>(null)

  // In a real app, you would fetch the event data here
  // This is a simplified example
  useEffect(() => {
    // Simulating API call
    const fetchEvent = async () => {
      // In a real app, you would fetch the event by ID

      


      const foundEvent = events.find((e) => e._id === eventId) || null
      setEvent(foundEvent)
    }

    fetchEvent()
  }, [eventId])

  if (!event) return null

  return (
    <Button onClick={() => bookingModal.onOpen(event)} size="lg">
      Book a Spot
    </Button>
  )
}

