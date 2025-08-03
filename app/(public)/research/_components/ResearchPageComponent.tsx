import React from 'react'


interface PageData {
  title: string;
  description: string;
  card: {
    title: string;
    cards: {
      title: string;
      description: string;
    }[]
  };
  cta: {
    title: string;
    description: string;
  };
}
const ResearchPageComponent = (
{pageData: {title, description, card, cta}}: {pageData: PageData}
) => {
  return (
    <div className=" mx-auto py-8">
    <div className=" max-w-3xl px-8 container mx-auto space-y-4 text-center items-center py-10">
    <h1 className="text-3xl font-bold mb-6">{title}</h1>
      <p className="mb-4">
        {description}
      </p>

    </div>
    <div className=" flex flex-col px-8 mx-auto text-center container space-y-4">
      <h2 className="text-2xl font-semibold mt-6 mb-4">{card.title}</h2>
            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {
                card.cards.map((card, index) => (
                <div key={index} className="bg-blue-100 dark:bg-brand md:text-start items-center flex flex-col md:items-start py-10 space-y-2 p-4 rounded-lg mb-4">
                    <h2 className="text-lg font-semibold mb-2">{card.title}</h2>
                    <hr className=' border-b-2 w-1/3 border-brand' />
                    <p>{card.description}</p>
                </div>
                ))
            }
            </div>
    </div>

      <div className="bg-brand container text-white dark:bg-black w-full mx-auto p-4 rounded-lg mt-6">
       <div className=" max-w-3xl coontainer text-center mx-auto space-y-4 items-center py-10">
       <h3 className="text-xl font-semibold mb-2">{cta.title}</h3>
        <p>
          {cta.description}
        </p>
       </div>
      </div>
    </div>
  )
}

export default ResearchPageComponent