import React from 'react'
import banner from '@/public/public-banner.jpg'

const PublicBanners = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${banner.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    className=' w-full h-[calc(100vh-30vh)] bg-cover bg-center bg-no-repeat bg-black bg-fixed bg-blend-overlay bg-opacity-50'>
        
    </div>
  )
}
export default PublicBanners