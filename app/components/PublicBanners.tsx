import React from 'react'
import banner from '@/public/public-banner.jpg'

const PublicBanners = ( {
  title,
  message
}: {
  title: string;
  message: string;
}
) => {
  return (
    <div
      style={{
        backgroundImage: `url(${banner.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
      className='w-full h-[calc(100vh-30vh)] flex items-center bg-cover bg-center bg-no-repeat bg-black/50 bg-fixed bg-blend-overlay bg-opacity-50'>
        <div className=" max-w-6xl mx-auto px-4 text-center">
        <div className="container max-w-6xl mx-auto px-4 backdrop-filter backdrop-blur-lg py-10 bg-brand/50 bg-opacity-50 p-8 rounded-lg">
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-4">{ title }</h1>
          <p className="text-md text-blue-2 max-w-3xl text-white">
            {message}
          </p>
        </div>
        </div>
    </div>
  )
}
export default PublicBanners