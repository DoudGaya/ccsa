import React from 'react'

const MissionAndVission = () => {
  return (
    <div className='container mx-auto bg-white py-20'>
        <div className=' grid grid-cols-1 md:grid-cols-2 gap-10'>
            <div className=' flex flex-col gap-4'>
                <h2 className='text-4xl font-bold border-b '>Vision</h2>
                <p className='text-lg text-gray-600'>
                To foster climate-resilient agricultural systems that promote food security,
                enhance livelihoods, and sustain the environment through innovation,
                education, research and practice.
                </p>
            </div>

            <div className=' flex flex-col gap-4'>
                <h2 className='text-4xl font-bold'>Mission</h2>
                <p className='text-lg text-gray-600'>
                To drive the transformation of agriculture in Sub-Saharan Africa by advancing
                climate-smart practices through cutting-edge research, innovative education,
                and collaborative partnerships, fostering resilience, enhancing capacity, and
                ensuring sustainability in agricultural systems to mitigate the impacts of climate
                change and promote food security, livelihoods, and environmental
                conservation.
                </p>
            </div>

        </div>
    </div>
  )
}

export default MissionAndVission