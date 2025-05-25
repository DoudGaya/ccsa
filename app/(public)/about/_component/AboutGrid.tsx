import React from 'react'

const AboutGrid = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        <div className='bg-white dark:bg-black shadow-md p-4 rounded-md'>
            <h3 className='text-lg font-semibold'>Our Mission</h3>
            <p className='text-gray-600'>To provide quality education and training for the development of the individual and society.</p>
        </div>
        <div className='bg-white dark:bg-black shadow-md p-4 rounded-md'>
            <h3 className='text-lg font-semibold'>Our Vision</h3>
            <p className='text-gray-600'>To be a world-class institution for the development of the individual and society.</p>
        </div>
        <div className='bg-white dark:bg-black shadow-md p-4 rounded-md'>
            <h3 className='text-lg font-semibold'>Our Core Values</h3>
            <p className='text-gray-600'>Excellence, Integrity, Innovation, and Service.</p>
        </div>
    </div>
  )
}

export default AboutGrid