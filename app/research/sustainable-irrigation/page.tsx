import { DynamicBanner } from '@/app/components/dynamics/DynamicBanner'
import React from 'react'






const page = () => {
  return (
    <div className='  flex flex-col'>
      <DynamicBanner
        bannerImage='/images/sustainable-irrigation-banner.jpg'
        title='Sustainable Irrigation'
        description='Sustainable Irrigation is a key component of the Climate Smart Agriculture program. It is a practice that aims to increase water use efficiency and reduce water wastage. It is also a practice that aims to reduce the environmental impact of irrigation systems. Sustainable Irrigation is a practice that aims to increase water use efficiency and reduce water wastage. It is also a practice that aims to reduce the environmental impact of irrigation systems.'
      />
    </div>
  )
}

export default page