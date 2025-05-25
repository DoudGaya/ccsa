
import { Suspense } from "react"
import { BookingModal } from "@/components/home/booking-modal"
import { EventList } from "@/components/home/event-list"
import { SanityTypes } from "@/@types"
import { getAllEvents } from "@/sanity/lib/quesries/eventQueries"
import PublicBanners from "../../components/PublicBanners"


export default async function EventsPage() {
//   const events = await getEvents()

const events = await getAllEvents() as SanityTypes.Events[]
  return (
  <div className=" flex w-full flex-col">
      <PublicBanners 
    message="Book a spot for our upcoming events"
    title="Upcoming Events"
    />
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Upcoming Events</h1>
      <Suspense fallback={<div>Loading events...</div>}>
        <EventList events={events} />
      </Suspense>
      <BookingModal />
    </div>
  </div>
  )
}

