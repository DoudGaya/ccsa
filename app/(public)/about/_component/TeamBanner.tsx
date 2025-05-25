import Image from "next/image"

export const TeamBanner = ({
  bannerImage,
  title,
  description,
  userImage,
}: {
  bannerImage: string
  title: string
  description: string
  userImage: string
}) => {
  return (
    <div className="relative h-[60vh] w-full overflow-hidden">
      <div
        style={{
          backgroundImage: `url(${bannerImage})`,
        }}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 flex flex-col justify-end pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full flex flex-col items-center text-center text-white">
          <Image
            src={userImage || "/placeholder.svg"}
            alt={title}
            width={150}
            height={150}
            className="rounded-full border-4 border-white shadow-lg mb-6"
          />
          <h1 className="text-4xl font-bold mb-2">{title}</h1>
          <p className="text-xl font-light italic max-w-2xl">{description}</p>
        </div>
      </div>
    </div>
  )
}

