import React from 'react'
import banner from '@/public/clear-banner.jpg'

const PublicBanners = ( {
  title,
  message,
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
      className='w-full flex flex-col h-[calc(100vh-40vh)] bg-blend-overlay bg-black justify-center  items-center bg-cover bg-center bg-no-repeat  bg-fixed bg-opacity-50'>
        <div className=" max-w-6xl mx-auto h-full justify-center flex items-center px-4 text-center">
        <div className="container max-w-6xl mx-auto px-4 backdrop-filter text-center py-10  bg-opacity-50 p-8 rounded-lg">
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-4">{ title }</h1>
          <p className="text-2xl text-blue-2 w-full flex text-center mx-auto font-semibold max-w-3xl text-white">
            {message}
          </p>
        </div>
        </div>
    </div>
  )
}
export default PublicBanners