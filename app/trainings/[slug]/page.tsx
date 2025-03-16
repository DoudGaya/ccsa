import Image from "next/image"
import Link from "next/link"
import {
  Leaf,
  Cpu,
  Briefcase,
  FileText,
  Handshake,
  ArrowLeft,
  CheckCircle2,
  Users,
  BookOpen,
  Presentation,
} from "lucide-react"
import { getAllTrainings, getSingleTraining } from "@/sanity/lib/quesries/trainingQueries"
import { SanityTypes } from "@/@types"
import PublicBanners from "@/app/components/PublicBanners"
import placeHolder from '@/public/placeholder-img.png'



type PageProps = {
    slug: string
}

export default async function TrainingProgramPage({ params }: { params: Promise<PageProps> }) {

  const {slug} = await params

  const training = await getSingleTraining(slug) as SanityTypes.Trainings


  const allTrainings = await getAllTrainings() as SanityTypes.Trainings[]

  if (!training) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-6">Training Program Not Found</h1>
        <p className="mb-6">The training program you're looking for doesn't exist.</p>
        <Link href="/trainings" className="text-blue-600 hover:text-blue-800 font-medium">
          Return to Training Programs
        </Link>
      </div>
    )
  }

  return (
   <div className="">
     <PublicBanners title="Training Programmes" message={"Aligned with CCSA Mandates" } />
    <div className=" grid  container mx-auto grid-cols-1 md:grid-cols-4 gap-4">
      <div className=" col-span-3">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
      <Link href="/training" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to All Training Programs
      </Link>

      {/* Header */}
      <div className={` text-white p-6 rounded-t-lg`}>
        <div className={`inline-flex items-center px-3 py-1 rounded-full mb-3`}>
          <div className=" rounded-full p-2 bg-green-300">
          <Leaf className="h-6 w-6 text-green-900 rounded-full" />
          </div>
          <span className={`ml-2 font-medium text-green-950 text-xl`}>{training.mandate}</span>
        </div>
        <h1 className="text-3xl text-brand font-bold mb-2">{training.title}</h1>
      </div>

      {/* Hero Image */}
      <div className="mb-8">
        <Image
          src={training.imageUrl || placeHolder}
          alt={training.title}
          width={1000}
          height={500}
          className="w-full object-cover h-80"
        />
      </div>

      {/* Overview */}
      <section className={`mb-8 p-6 rounded-lg border-2 border-green-500  `}>
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <BookOpen className="h-6 w-6 mr-2 text-gray-700" />
          Overview
        </h2>
        <p>{training.overview}</p>
      </section>

      {/* Learning Outcomes */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <CheckCircle2 className="h-6 w-6 mr-2 text-gray-700" />
          Learning Outcomes
        </h2>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-green-200">
          <p className="mb-4">Upon completing the programme, participants will:</p>
          <ul className="space-y-2">
            {training.learningOutcomes.map((outcome, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle2 className="h-5 w-5 mr-2 text-green-600 mt-0.5 flex-shrink-0" />
                <span>{outcome}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Curriculum */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <BookOpen className="h-6 w-6 mr-2 text-gray-700" />
          Curriculum
        </h2>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-green-200">
          <ol className="list-decimal pl-5 space-y-2">
            {training.curriculum.map((item, index) => (
              <li key={index} className="pl-2">
                {item}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Pedagogy */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <Presentation className="h-6 w-6 mr-2 text-gray-700" />
          Pedagogy
        </h2>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-green-200">
          <ul className="list-disc pl-5 space-y-2">
            {training.pedagogy.map((item, index) => (
              <li key={index} className="pl-2">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Target Audience */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <Users className="h-6 w-6 mr-2 text-gray-700" />
          Target Audience
        </h2>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-green-200">
          <ul className="list-disc pl-5 space-y-2">
            {training.targetAudience.map((item, index) => (
              <li key={index} className="pl-2">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Application */}
      <section className={`  p-6 rounded-lg mb-8`}>
        <h2 className={`text-xl font-semibold mb-4`}>Ready to Apply?</h2>
        <p className="mb-6">
          Join our {training.title} programme to gain the knowledge and skills needed to implement climate-smart
          agricultural practices and drive sustainable change.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            className={`bg-brand hover:bg-opacity-90 text-white font-medium py-2 px-6 rounded-md transition duration-300`}
          >
            Apply Now
          </button>
          {/* <button
            className={`bg-white border border-yellow-300 hover:bg-opacity-90 font-medium py-2 px-6 rounded-md transition duration-300`}
          >
            Download Brochure
          </button> */}
        </div>
      </section>

      {/* Related Programs */}

    </div>
      </div>
      <section className="my-8 ">
        <h2 className="text-2xl font-semibold mb-6">Related Programs</h2>
        <div className="grid grid-cols-1 gap-3">
          {allTrainings
            .filter((p) => p._id !== training._id)
            .slice(0, 4)
            .map((relatedtraining) => (
              <div
                key={relatedtraining._id}
                className="bg-white rounded-lg shadow-sm overflow-hidden border border-green-200"
              >
                <div className="h-40 relative">
                  <Image
                    src={relatedtraining.imageUrl || placeHolder}
                    alt={relatedtraining.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <div
                    className={`inline-flex items-center bg-green-300 px-3 py-1 rounded-full mb-2`}
                  >
                    {/* {relatedtraining.mandateIcon} */}
                    <Leaf className=" h-6 w-6" />
                    <span className={`ml-2 text-xs font-medium text-green-900`}>
                      {relatedtraining.mandate}
                    </span>
                  </div>
                  <h3 className="font-semibold mb-2 line-clamp-2">{relatedtraining.title}</h3>
                  <Link
                    href={`/trainings/${relatedtraining.slug}`}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </section>
    </div>
   </div>
  )
}
