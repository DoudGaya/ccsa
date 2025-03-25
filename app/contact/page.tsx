"use client"
import Image from "next/image"
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Contact } from "lucide-react"
import contactBanner from '@/public/contact-us.jpg'
import ContactForm from "./_component/ContactForm"
import PublicBanners from "../components/PublicBanners"

const ContactPage = () => {
  
  
  return (
    <div>
      <PublicBanners 
        title='Contact Us'
        message='Reach out to the Centre for Climate-Smart Agriculture for inquiries, collaborations, or more information.'
        />
    

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Form */}
          <ContactForm />
          {/* Contact Information */}
          <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-6 text-green-700">Contact Information</h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-green-100 p-3 rounded-full mr-4 flex-shrink-0">
                  <MapPin className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Our Location</h3>
                  <p className="text-gray-700">
                    Plot 432, Yakubu J. Pam Street, Opposite National Hospital, Central Business District, Abuja
                  </p>
                </div>
              </div>

              {/* <div className="flex items-start">
                <div className="bg-green-100 p-3 rounded-full mr-4 flex-shrink-0">
                  <Phone className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Phone Number</h3>
                  <p className="text-gray-700">(+234) 803 550 2270</p>
                </div>
              </div> */}

              <div className="flex items-start">
                <div className="bg-green-100 p-3 rounded-full mr-4 flex-shrink-0">
                  <Mail className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Email Address</h3>
                  <p className="text-gray-700">ccsa@cosmopolitan.edu.ng</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-green-100 p-3 rounded-full mr-4 flex-shrink-0">
                  <Clock className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Office Hours</h3>
                  <p className="text-gray-700">Monday - Friday: 8:00 AM - 5:00 PM</p>
                  <p className="text-gray-700">Saturday: 9:00 AM - 1:00 PM</p>
                  <p className="text-gray-700">Sunday: Closed</p>
                </div>
              </div>
            </div>

            {/* <div className="mt-8">
              <h3 className="font-semibold mb-3">Connect With Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="bg-blue-100 p-2 rounded-full hover:bg-blue-200 transition-colors">
                  <svg className="h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                  </svg>
                </a>
                <a href="#" className="bg-blue-100 p-2 rounded-full hover:bg-blue-200 transition-colors">
                  <svg className="h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
                <a href="#" className="bg-blue-100 p-2 rounded-full hover:bg-blue-200 transition-colors">
                  <svg className="h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.441 16.892c-2.102.144-6.784.144-8.883 0C5.282 16.736 5.017 15.622 5 12c.017-3.629.285-4.736 2.558-4.892 2.099-.144 6.782-.144 8.883 0C18.718 7.264 18.982 8.378 19 12c-.018 3.629-.285 4.736-2.559 4.892zM10 9.658l4.917 2.338L10 14.342V9.658z" />
                  </svg>
                </a>
                <a href="#" className="bg-blue-100 p-2 rounded-full hover:bg-blue-200 transition-colors">
                  <svg className="h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div> */}
          </div>
        </div>

        {/* Map Section */}
        <div className="bg-white rounded-xl shadow-md p-6 md:p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6 text-green-700">Our Location</h2>
          <div className="h-[400px] w-full rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.1768075533196!2d7.4899!3d9.0476!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e0ba5c5936d27%3A0x5e8f35e0ac16c59!2sCentral%20Business%20District%2C%20Abuja!5e0!3m2!1sen!2sng!4v1616661080000!5m2!1sen!2sng"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              aria-hidden="false"
              tabIndex={0}
            ></iframe>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-6 text-green-700">Frequently Asked Questions</h2>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">How can I collaborate with CCSA?</h3>
              <p className="text-gray-700">
                We welcome collaborations with researchers, organisations, and institutions. Please reach out to us
                through the contact form with details about your proposed collaboration.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Do you offer training programs for farmers?</h3>
              <p className="text-gray-700">
                Yes, we offer various training programs for farmers, extension agents, and other stakeholders. Visit our
                Training page for more information about upcoming programs.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">How can I support CCSA's initiatives?</h3>
              <p className="text-gray-700">
                There are many ways to support our work, including partnerships, donations, and volunteering. Contact us
                to discuss how you can contribute to our mission.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Can I visit the CCSA facilities?</h3>
              <p className="text-gray-700">
                Yes, we welcome visitors. Please contact us in advance to schedule a visit to our facilities, including
                our Maker Space and research areas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ContactPage