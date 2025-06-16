import Image from "next/image"
import Link from "next/link"
import { Calendar, Users, Award, CheckCircle2, Send, MapPin, Sprout } from "lucide-react"
import PublicBanners from "../../components/PublicBanners"
import image from '@/public/volunteers.jpg'
import banner from '@/public/volunteer-banner.jpg'
import { VolunteerActionArea } from "./_components/VolunteerActionArea"

export default function VolunteerFarmers() {
  return (
   <div className="">
    <PublicBanners title='Volunteer Farmers' message='Join the Climate-Smart Agriculture Movement!' />
     <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Hero Banner */}
      <div className="relative h-80 rounded-xl overflow-hidden mb-12">
        <Image src={banner} alt="Volunteer Farmers" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 to-transparent flex items-center">
          <div className="text-white p-8 max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Call for Volunteer Farmers</h1>
            <p className="text-lg md:text-xl">Join the Climate-Smart Agriculture Movement!</p>
          </div>
        </div>
      </div>

      {/* Introduction */}
      <section className="mb-1\2">
        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-green-100">
          <p className="mb-4 text-lg">
            The Centre for Climate-Smart Agriculture (CCSA) at Cosmopolitan University Abuja, Nigeria, is pleased to
            announce a call for volunteer farmers to support our climate-smart agriculture initiatives.
          </p>
          <div className="flex items-center justify-center mt-4">
            <div className="bg-white px-6 py-3 rounded-full border border-green-200 inline-flex items-center">
              <Calendar className="h-5 w-5 text-green-600 mr-2" />
              <span className="font-medium">Application Deadline: 15 April 2025</span>
            </div>
          </div>
        </div>
      </section>

      {/* About the Programme */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 border-b pb-2 flex items-center">
          <Sprout className="h-6 w-6 mr-2 text-green-600" />
          About the Programme
        </h2>

        <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
          <p className="mb-4">
            We seek volunteer farmers to participate in our climate-smart agriculture programme, which aims to promote
            sustainable agricultural practices, improve crop yields and enhance resilience to climate change.
          </p>
          <Image
            src={image}
            alt="Climate-smart farming practices"
            width={800}
            height={400}
            className="rounded-lg w-full object-cover h-64"
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-xl font-semibold mb-4 text-green-700">Specific Activity</h3>
          <p className="mb-4">
            We are particularly interested in working with volunteer farmers to develop and test the{" "}
            <strong>
              Digitalisation of Farmers and Farm Information Systems with AI-powered climate-smart Advisory Services for
              Sustainable Agriculture
            </strong>
            . This innovative approach leverages artificial intelligence, data analytics and digital technologies to
            provide farmers with climate-smart advisory services, enabling informed decision-making and optimised
            agricultural practices.
          </p>

          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <div className="bg-blue-100 h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <Image
                  src="/placeholder.svg?height=24&width=24"
                  alt="AI Technology"
                  width={24}
                  height={24}
                  className="text-blue-600"
                />
              </div>
              <h4 className="font-medium text-blue-700">AI-Powered Advisory</h4>
              <p className="text-sm mt-2">Personalised recommendations based on farm data and climate conditions</p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg text-center">
              <div className="bg-green-100 h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <Image
                  src="/placeholder.svg?height=24&width=24"
                  alt="Digital Farming"
                  width={24}
                  height={24}
                  className="text-green-600"
                />
              </div>
              <h4 className="font-medium text-green-700">Digital Farm Records</h4>
              <p className="text-sm mt-2">Comprehensive digital tracking of farm activities and performance</p>
            </div>

            <div className="bg-amber-50 p-4 rounded-lg text-center">
              <div className="bg-amber-100 h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <Image
                  src="/placeholder.svg?height=24&width=24"
                  alt="Climate Resilience"
                  width={24}
                  height={24}
                  className="text-amber-600"
                />
              </div>
              <h4 className="font-medium text-amber-700">Climate Resilience</h4>
              <p className="text-sm mt-2">Strategies to adapt farming practices to changing climate conditions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Role of Volunteer Farmers */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 border-b pb-2 flex items-center">
          <Users className="h-6 w-6 mr-2 text-green-600" />
          Role of Volunteer Farmers
        </h2>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <p className="mb-6">As a volunteer farmer, you will:</p>

          <div className="space-y-4">
            <div className="flex items-start">
              <CheckCircle2 className="h-5 w-5 mr-3 text-green-600 mt-0.5 flex-shrink-0" />
              <p>Participate in training sessions on climate-smart agriculture practices and digital technologies</p>
            </div>

            <div className="flex items-start">
              <CheckCircle2 className="h-5 w-5 mr-3 text-green-600 mt-0.5 flex-shrink-0" />
              <p>Share expertise and experience with other farmers</p>
            </div>

            <div className="flex items-start">
              <CheckCircle2 className="h-5 w-5 mr-3 text-green-600 mt-0.5 flex-shrink-0" />
              <p>Test and evaluate new climate-resilient crop varieties and agricultural practices</p>
            </div>

            <div className="flex items-start">
              <CheckCircle2 className="h-5 w-5 mr-3 text-green-600 mt-0.5 flex-shrink-0" />
              <p>
                Provide feedback and insights to inform programme development and improve AI-powered advisory services
              </p>
            </div>

            <div className="flex items-start">
              <CheckCircle2 className="h-5 w-5 mr-3 text-green-600 mt-0.5 flex-shrink-0" />
              <p>Collaborate with our team to develop and refine digitalised farm information systems</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits and Eligibility */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Benefits */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 border-b pb-2 flex items-center">
            <Award className="h-6 w-6 mr-2 text-green-600" />
            Benefits
          </h2>

          <div className="bg-white p-6 rounded-lg shadow-sm border h-full">
            <p className="mb-6">By volunteering with us, you will:</p>

            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-green-100 p-1 rounded-full mr-3 mt-0.5 flex-shrink-0">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                </div>
                <p>Gain access to training and capacity-building opportunities</p>
              </div>

              <div className="flex items-start">
                <div className="bg-green-100 p-1 rounded-full mr-3 mt-0.5 flex-shrink-0">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                </div>
                <p>Enhance knowledge and skills in climate-smart agriculture and digital technologies</p>
              </div>

              <div className="flex items-start">
                <div className="bg-green-100 p-1 rounded-full mr-3 mt-0.5 flex-shrink-0">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                </div>
                <p>Contribute to sustainable agriculture practices and innovative solutions</p>
              </div>

              <div className="flex items-start">
                <div className="bg-green-100 p-1 rounded-full mr-3 mt-0.5 flex-shrink-0">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                </div>
                <p>Network with farmers and stakeholders in the agriculture sector</p>
              </div>

              <div className="flex items-start">
                <div className="bg-green-100 p-1 rounded-full mr-3 mt-0.5 flex-shrink-0">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                </div>
                <p>Join a pioneering effort to leverage AI and digital technologies for sustainable agriculture</p>
              </div>
            </div>
          </div>
        </section>

        {/* Eligibility */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 border-b pb-2 flex items-center">
            <Users className="h-6 w-6 mr-2 text-green-600" />
            Eligibility
          </h2>

          <div className="bg-white p-6 rounded-lg shadow-sm border h-full">
            <p className="mb-6">We seek volunteer farmers who:</p>

            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-green-100 p-1 rounded-full mr-3 mt-0.5 flex-shrink-0">
                  <MapPin className="h-4 w-4 text-green-600" />
                </div>
                <p>Are based in Nigeria with preferences for the northern region</p>
              </div>

              <div className="flex items-start">
                <div className="bg-green-100 p-1 rounded-full mr-3 mt-0.5 flex-shrink-0">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                </div>
                <p>Have experience in farming and agricultural practices</p>
              </div>

              <div className="flex items-start">
                <div className="bg-green-100 p-1 rounded-full mr-3 mt-0.5 flex-shrink-0">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                </div>
                <p>Are interested in climate-smart agriculture, sustainable development and digital technologies</p>
              </div>

              <div className="flex items-start">
                <div className="bg-green-100 p-1 rounded-full mr-3 mt-0.5 flex-shrink-0">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                </div>
                <p>Are willing to commit time and effort to programme activities</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* How to Apply */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 border-b pb-2 flex items-center">
          <Send className="h-6 w-6 mr-2 text-green-600" />
          How to Apply
        </h2>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <p className="mb-6">If interested, please submit your application, including:</p>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-medium text-green-700 mb-2">Brief Introduction</h4>
              <p className="text-sm">Include a statement of interest explaining why you want to join the program</p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-medium text-green-700 mb-2">Farming Experience</h4>
              <p className="text-sm">Describe your farming background, crops grown and agricultural expertise</p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-medium text-green-700 mb-2">Contact Details</h4>
              <p className="text-sm">Provide your full name, phone number, email and farm location</p>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h4 className="font-semibold text-blue-700 mb-2">Submit Your Application</h4>
                <p className="mb-4 md:mb-0">
                  Send your application to:{" "}
                  <a href="mailto:ccsa@cosmopolitan.edu.ng" className="text-blue-600 hover:underline">
                    ccsa@cosmopolitan.edu.ng
                  </a>
                </p>
              </div>
              <Link
                href="/contact"
                className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-md transition duration-300 inline-flex items-center"
              >
                Contact Us for Enquiry <Send className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {/* <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 border-b pb-2">Testimonials from Previous Volunteers</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-start">
              <div className="mr-4">
                <div className="h-12 w-12 bg-gray-200 rounded-full overflow-hidden">
                  <Image
                    src="/images/farmer-testimonial-1.jpg"
                    alt="Farmer testimonial"
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Ibrahim Musa</h4>
                <p className="text-sm text-gray-600 mb-3">Maize Farmer, Kaduna State</p>
                <p className="text-sm italic">
                  "Participating in CCSA's volunteer program transformed my farming practices. The AI advisory services
                  helped me optimize my irrigation and reduce water usage by 30%. I've seen significant improvements in
                  my crop yields despite challenging weather conditions."
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-start">
              <div className="mr-4">
                <div className="h-12 w-12 bg-gray-200 rounded-full overflow-hidden">
                  <Image
                    src="/images/farmer-testimonial-2.jpg"
                    alt="Farmer testimonial"
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Amina Yusuf</h4>
                <p className="text-sm text-gray-600 mb-3">Vegetable Farmer, Kano State</p>
                <p className="text-sm italic">
                  "The digital farm information system has made record-keeping so much easier. I can now track my
                  inputs, yields and profits accurately. The training on climate-smart practices has helped me adapt to
                  changing weather patterns and protect my crops."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-lg text-center">
        <h2 className="text-2xl font-semibold mb-4">Join the Climate-Smart Agriculture Movement!</h2>
        <p className="mb-6 max-w-2xl mx-auto">
          Be part of a pioneering initiative that combines traditional farming knowledge with cutting-edge technology to
          create a more sustainable and resilient agricultural future.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">

          <VolunteerActionArea />
          {/* <Link
            href="/contact"
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-md transition duration-300"
          >
            Apply as a Volunteer Farmer
          </Link> */}
          <Link
            href="/innovation/digital-platforms"
            className="bg-white border border-green-600 hover:bg-green-50 text-green-600 font-medium py-2 px-6 rounded-md transition duration-300"
          >
            Learn About Our Digital Platforms
          </Link>
        </div>
        <p className="mt-6 text-sm text-gray-600">
          Application Deadline: 15 April 2025 | Contact: ccsa@cosmopolitan.edu.ng
        </p>
      </section>
    </div>
   </div>
  )
}

