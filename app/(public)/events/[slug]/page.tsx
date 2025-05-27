import { notFound } from "next/navigation"
import { format } from "date-fns"
import { CalendarIcon, MapPinIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
// import { BookingModal } from "@/components/booking-modal"
import { BookingModal } from "@/components/home/booking-modal"
import BookingClientWrapper from "@/components/home/BookingClientWrapper"
import { SanityTypes } from "@/@types"
import { getAllEvents, getSingleEvents } from "@/sanity/lib/quesries/eventQueries"
import PublicBanners from "@/app/components/PublicBanners"
import { EventActionArea } from "../_component/EventActionArea"


type EventPageProps = {
  slug: string
}


export default async function EventPage({ params }: {params: Promise<EventPageProps>}) {

    const { slug } = await params
    const event = await getSingleEvents(slug) as SanityTypes.Events
    const events = await getAllEvents() as SanityTypes.Events[]


  if (!event) {
    notFound()
  }

  const formattedStartDate = format(new Date(event.startDate), "MMMM d, yyyy")
  const formattedEndDate = format(new Date(event.endDate), "MMMM d, yyyy")
  const sameDay = formattedStartDate === formattedEndDate

  return (

   <div className="">
    <PublicBanners 
    title={event.title}
    message={event.description}
    />
     <div className="container font-main font-semibold mx-auto px-10 py-10">
      <div className="max-w-3xl mx-auto">
        {/* <h1 className="text-4xl font-bold font-main mb-6">{event.title}</h1> */}

        <div className=" bg-green-200/50 rounded-lg p-6 mb-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-center">
              <CalendarIcon className="mr-3 h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Date</p>
                <p className="font-medium">
                  {sameDay ? formattedStartDate : `${formattedStartDate} - ${formattedEndDate}`}
                </p>
              </div>
            </div>
            <div className="flex space-y-3 items-start flex-col">
             <div className=" flex space-x-2">
             <MapPinIcon className=" h-5 w-5 text-muted-foreground" />
             <p className="text-sm text-muted-foreground">Location</p>
             </div>
              <div>
                <p className="font-medium text-sm">
                  {event.location} | Remote
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">About This Event</h2>
          <div className="prose max-w-none">
            <p className="whitespace-pre-line">{event.description}</p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Tags</h2>
          <div className="flex flex-wrap gap-2">
            {event.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-sm">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <div className="bg-muted/30 rounded-lg py-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Interested in attending?</h2>
          <p className="mb-4">Secure your spot for this event by filling out our booking form.</p>
          {/* <BookingClientWrapper events={events} eventId={event._id} /> */}
      <EventActionArea event={event} />
        </div>
      </div>
      {/* <BookingModal /> */}
    </div>
   </div>
  )
}