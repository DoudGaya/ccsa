import Image from "next/image"
import Link from "next/link"
import { Leaf, Cpu, Briefcase, FileText, Handshake, ArrowRight, GraduationCap } from "lucide-react"
import PublicBanners from "../components/PublicBanners"

// Training programs data
const trainingPrograms = [
  {
    id: "csap",
    title: "Certificate in Sustainable Agricultural Practices (CSAP)",
    mandate: "Sustainable Practice",
    mandateIcon: <Leaf className="h-5 w-5 text-green-600" />,
    mandateColor: "bg-green-100",
    textColor: "text-green-700",
    description:
      "Equip participants with knowledge and skills to implement sustainable agricultural practices across various platforms, including livestock, crops, poultry, and fishing.",
    image: "/images/sustainable-agriculture-training.jpg",
  },
  {
    id: "etcra",
    title: "Certificate in Emerging Technologies for Climate-Resilient Agriculture (ETCRA)",
    mandate: "Emerging Technologies",
    mandateIcon: <Cpu className="h-5 w-5 text-blue-600" />,
    mandateColor: "bg-blue-100",
    textColor: "text-blue-700",
    description:
      "Explore the application of emerging technologies, including artificial intelligence (AI), machine learning (ML) and the Internet of Things (IoT), to enhance climate resilience in agriculture.",
    image: "/images/agritech-training.jpg",
  },
  {
    id: "apc",
    title: "Agribusiness Proficiency Course",
    mandate: "Agri-Entrepreneurship",
    mandateIcon: <Briefcase className="h-5 w-5 text-amber-600" />,
    mandateColor: "bg-amber-100",
    textColor: "text-amber-700",
    description:
      "Equip participants with essential skills to establish and manage profitable agribusiness ventures, with a strong focus on farm management.",
    image: "/images/agribusiness-training.jpg",
  },
  {
    id: "csapa",
    title: "Certificate in Climate-Smart Agriculture Policy and Advocacy (CSAPA)",
    mandate: "Policy and Advocacy",
    mandateIcon: <FileText className="h-5 w-5 text-purple-600" />,
    mandateColor: "bg-purple-100",
    textColor: "text-purple-700",
    description:
      "Explore the intersection of policy, sustainability, and climate-smart agriculture to drive policy change and advocate for sustainable practices.",
    image: "/images/policy-advocacy-training.jpg",
  },
  {
    id: "csap-partnerships",
    title: "Certificate in Climate-Smart Agriculture Partnerships (CSAP)",
    mandate: "Partnerships",
    mandateIcon: <Handshake className="h-5 w-5 text-teal-600" />,
    mandateColor: "bg-teal-100",
    textColor: "text-teal-700",
    description:
      "Foster collaboration between agricultural experts, policymakers, and private-sector stakeholders to develop partnerships for climate-resilient agriculture.",
    image: "/images/partnerships-training.jpg",
  },
]

export default function TrainingPrograms() {
  return (
    <div className="  font-main">
      <PublicBanners title="Training Programmes" message={"Aligned with CCSA Mandates" } />
      <div className="container mx-auto px-4 py-8 max-w-5xl">
      
      <h1 className="text-3xl font-bold mb-2 text-center">Training Programmes</h1>
      <h2 className="text-xl font-medium mb-8 text-center text-green-700">Aligned with CCSA Mandates</h2>


      {/* Introduction */}
      <section className="mb-12">
        <div className=" p-6 rounded-lg">
          <p className="mb-4">
            The Centre for Climate-Smart Agriculture (CCSA) is dedicated to advancing sustainable agricultural practices
            through cutting-edge training programmes integrating industry best practices, emerging technologies, and
            policy frameworks. Each programme is designed to be practical, industry-aligned and policy-driven, equipping
            participants with hands-on experience, sector-relevant skills, tools and the expertise to shape sustainable
            agricultural policies.
          </p>
          <p>
            By fostering a collaborative ecosystem where agriculture, artificial intelligence (AI) and policy
            development intersect, these training programs empower participants to tackle real-world agricultural
            challenges. The curriculum is structured around CCSA's five core mandates:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="flex items-center flex-col">
              <div className="bg-green-100 p-2 rounded-full mr-2">
                <Leaf className="h-5 w-5 text-green-600" />
              </div>
              <span className="font-medium">Sustainable Practice</span>
            </div>
            <div className="flex items-center flex-col">
              <div className="bg-blue-100 p-2 rounded-full mr-2">
                <Cpu className="h-5 w-5 text-blue-600" />
              </div>
              <span className="font-medium">Emerging Technologies</span>
            </div>
            <div className="flex items-center flex-col">
              <div className="bg-amber-100 p-2 rounded-full mr-2">
                <Briefcase className="h-5 w-5 text-amber-600" />
              </div>
              <span className="font-medium">Agri-Entrepreneurship</span>
            </div>
            <div className="flex items-center flex-col">
              <div className="bg-purple-100 p-2 rounded-full mr-2">
                <FileText className="h-5 w-5 text-purple-600" />
              </div>
              <span className="font-medium">Policy & Advocacy</span>
            </div>
            <div className="flex items-center flex-col">
              <div className="bg-teal-100 p-2 rounded-full mr-2">
                <Handshake className="h-5 w-5 text-teal-600" />
              </div>
              <span className="font-medium">Partnerships</span>
            </div>
          </div>

          <p className="mt-6">
            These training programmes cater to a diverse audience, including smallholder and large-scale farmers, AI,
            data science and technology experts and enthusiasts, policymakers, researchers and entrepreneurs. Through a
            comprehensive, interdisciplinary approach, participants will gain the skills and insights to drive
            meaningful change in climate-smart agricultural practices.
          </p>
        </div>
      </section>

      {/* Training Structure */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 border-b pb-2">Training Structure</h2>
        <p className="mb-6 font-semibold">Each programme is structured to provide:</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-8 rounded-lg shadow-sm border border-green-400">
            <h3 className="font-semibold mb-2 text-green-700">Overview</h3>
            <p className="text-sm">A clear introduction to the training focus</p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm border border-green-400">
            <h3 className="font-semibold mb-2 text-green-700">Learning Outcomes</h3>
            <p className="text-sm">Key skills and knowledge participants will gain</p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm border border-green-400">
            <h3 className="font-semibold mb-2 text-green-700">Curriculum</h3>
            <p className="text-sm">A detailed breakdown of topics covered</p>
          </div>

         <div className=" grid-cols-2 grid gap-6 col-span-3">
         <div className="bg-white p-8 rounded-lg shadow-sm border border-green-400">
            <h3 className="font-semibold mb-2 text-green-700">Pedagogy</h3>
            <p className="text-sm">The teaching methodology, including hands-on activities</p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm border border-green-400">
            <h3 className="font-semibold mb-2 text-green-700">Target Audience</h3>
            <p className="text-sm">The intended beneficiaries of the programme</p>
          </div>
         </div>
        </div>

        <p>
          Below is the list of our training programmes, carefully crafted to equip participants with the skills and
          tools to transform agriculture for a more sustainable future.
        </p>
      </section>

      {/* Training Programs */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 border-b pb-2 flex items-center">
          <GraduationCap className="h-6 w-6 mr-2 text-green-600" />
          Available Training Programmes
        </h2>

        <div className="space-y-8">
          {trainingPrograms.map((program) => (
            <div key={program.id} className="bg-white py-6 rounded-lg shadow-md overflow-hidden border border-gray-200">
              <div className="md:flex">
                <div className="md:w-1/3 relative h-60 md:h-auto">
                  <Image src={program.image || "/placeholder.svg"} alt={program.title} fill className="object-cover" />
                </div>
                <div className="md:w-2/3 p-6">
                  <div className={`inline-flex items-center ${program.mandateColor} px-3 py-1 rounded-full mb-3`}>
                    {program.mandateIcon}
                    <span className={`ml-2 text-sm font-medium ${program.textColor}`}>{program.mandate}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{program.title}</h3>
                  <p className="mb-4">{program.description}</p>
                  <Link
                    href={`/training/${program.id}`}
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                  >
                    View Programme Details <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-lg text-center">
        <h2 className="text-2xl font-semibold mb-4">Ready to Enhance Your Skills?</h2>
        <p className="mb-6 max-w-2xl mx-auto">
          Join our training programmes to gain the knowledge and skills needed to implement climate-smart agricultural
          practices and drive sustainable change.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-md transition duration-300">
            Apply for a Programme
          </button>
          <button className="bg-white border border-green-600 hover:bg-green-50 text-green-600 font-medium py-2 px-6 rounded-md transition duration-300">
            Request Custom Training
          </button>
        </div>
      </section>
    </div>
    </div>
  )
}

