import PublicBanners from '@/app/components/PublicBanners'
import { getSingleTraining } from '@/sanity/lib/quesries/trainingQueries'
import { CalendarIcon, MapPinIcon } from 'lucide-react'
import React from 'react'
import { SanityTypes } from '@/@types'
import { PortableText } from 'next-sanity'

type PageProps = {
  slug: string
}

const page = async ( {params}: {params: Promise<PageProps>} ) => {

  const { slug } = await params
  console.log(slug)

  const sameDay = true; // Replace with actual logic
  const formattedStartDate = '2023-01-01'; // Replace with actual logic
  const formattedEndDate = '2023-01-02'; // Replace with actual logic
  console.log(slug)




  const training = await getSingleTraining(slug) as SanityTypes.Trainings


  return (
    <div>
      <PublicBanners 
      title='Trainings'
      message='We offer a variety of training programs in the Center for Climate-Smart Agriculture, Cosmopolitan University Abuja.'
      />
      <div className=" flex flex-col space-y-8">
        <div className="container font-main font-semibold mx-auto px-10 py-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold font-main mb-6">{training.title}</h1>
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
                      {training.location} | {training.venue}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <article className=" prose lg:prose-lg dark:prose-invert font-main w-full max-w-4xl mx-auto text-lg space-y-6">
          <PortableText 
          // @ts-ignore
          value={training.description} />
        </article>
        </div>

        
      </div>
    </div>
  )
}
 
export default page