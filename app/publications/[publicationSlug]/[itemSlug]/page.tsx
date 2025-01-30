import React from 'react'


type Params = {
  itemSlug : string
}

const page = async (params: Promise<Params>) => {

    const { itemSlug } = await params
  return (
    <div className=' text-2xl'> {itemSlug} </div>
  )
}

export default page 
 