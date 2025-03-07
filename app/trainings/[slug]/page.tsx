import PublicBanners from '@/app/components/PublicBanners'
import React from 'react'

type PageProps = {
  slug: string
}

const page = async ( {params}: {params: Promise<PageProps>} ) => {

  const { slug } = await params

  console.log(slug)


  return (
    <div>
      <PublicBanners 
      title='Trainings'
      message='We offer a variety of training programs in the Center for Climate-Smart Agriculture, Cosmopolitan University Abuja.'
      
      />

    </div>
  )
}

export default page