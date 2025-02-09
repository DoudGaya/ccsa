import React from 'react'


type Params = {
  publicationSlug: string
  itemSlug: string
}

const page = async (
  { params }: { params: Promise<any> }
) => {
  
  const { publicationSlug } = await params

  console.log(publicationSlug)
  return (
    <div className=' text-2xl'> {'ello world '} </div>
  )
}

export default page 
 