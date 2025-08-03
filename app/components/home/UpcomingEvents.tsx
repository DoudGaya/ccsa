import { SanityTypes } from '@/@types'
import React from 'react'
import { EventList } from '@/components/home/event-list'

const UpcomingEvents = ( {e}: {e: SanityTypes.Events[] } ) => {
  return (
    <div className=" flex flex-col py-10 w-full space-y-8">
        <div className=" w-full container mx-auto flex flex-col md:flex-row justify-between px-4 sm:px-6 lg:px-8">
           <h2 className=' text-4xl font-bold max-w-max py-2 '>Events</h2>
        </div>
        <EventList events={e} />
    </div>
  )
}

export default UpcomingEvents