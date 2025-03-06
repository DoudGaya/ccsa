import { SanityTypes } from '@/@types'
import React from 'react'
import { EventList } from '@/components/home/event-list'

const UpcomingEvents = ( {e}: {e: SanityTypes.Events[] } ) => {
  return (
    <div className=" flex flex-col py-10 w-full space-y-8">
        <div className=" w-full container mx-auto px-4 sm:px-6 lg:px-8">
           <h2 className=' text-4xl font-bold border-b-4 max-w-max py-2 border-blue-900 '> Upcoming Events</h2>
        </div>
        <EventList events={e} />
    </div>
  )
}

export default UpcomingEvents