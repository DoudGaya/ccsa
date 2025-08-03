
// import { EventCard } from "@/components/event-card"
import { SanityTypes } from "@/@types"
import { EventCard } from "./event-card"
import PublicBanners from "@/app/components/PublicBanners"

interface EventListProps {
  events: SanityTypes.Events[]
}

export function EventList({ events }: EventListProps) {
  return (
    <div className="grid container mx-auto grid-cols-1 max-w-7xl w-full sm:grid-cols-2 lg:grid-cols-2 py-8 gap-6">
      {events.map((event) => (
        <EventCard key={event._id} event={event} />
      ))}
    </div>
  )
}

