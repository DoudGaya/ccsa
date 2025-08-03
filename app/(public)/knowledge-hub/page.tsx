import React from 'react'
import PublicBanners from '../../components/PublicBanners'

const page = () => {
  return (
    <div className=" flex flex-col items-center justify-center">
        <PublicBanners title='Knowledge Hub' message='' />
        <div className=' py-20'> List of Universities offering agric goes here</div>
    </div>
  )
}

export default page