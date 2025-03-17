// Research items array with added icon and image properties
import { ArrowRight, Leaf, Cpu, Briefcase, FileText, Handshake } from "lucide-react"
export const researchItems = [
    {
      title: "Sustainable Practice",
      description: "Sustainably Advance Climate-Smart Agricultural Practices for Enhanced Food and Nutrition Security.",
      href: "/research/climate-smart-agriculture",
      icon: <Leaf className="h-6 w-6 text-green-600" />,
      color: "bg-green-100",
      textColor: "text-green-700",
      borderColor: "border-green-200",
      image: "/images/sustainable-agriculture.jpg",
    },
    {
      title: "Emerging Technologies",
      description:
        "Leverage CU emerging technologies at the maker space to promote digital and data analytics transformation in Agriculture.",
      href: "/research/emerging-technologies",
      icon: <Cpu className="h-6 w-6 text-blue-600" />,
      color: "bg-blue-100",
      textColor: "text-blue-700",
      borderColor: "border-blue-200",
      image: "/images/emerging-technologies.jpg",
    },
    {
      title: "Agri-Entrepreneurship",
      description:
        "Provide training and capacity-building programs for farmers, extension agents, and other stakeholders.",
      href: "/research/ag-entrepreneurship",
      icon: <Briefcase className="h-6 w-6 text-amber-600" />,
      color: "bg-amber-100",
      textColor: "text-amber-700",
      borderColor: "border-amber-200",
      image: "/images/agri-entrepreneurship.jpg",
    },
    {
      title: "Policy and Advocacy",
      description:
        "Promote resilience and adaptation to environmental changes through policy, advocacy and stakeholder engagement.",
      href: "/research/policy-advocacy",
      icon: <FileText className="h-6 w-6 text-purple-600" />,
      color: "bg-purple-100",
      textColor: "text-purple-700",
      borderColor: "border-purple-200",
      image: "/images/policy-advocacy.jpg",
    },
    {
      title: "Partnerships",
      description:
        "Foster partnerships with national and international organizations to leverage resources and expertise.",
      href: "/research/partnerships",
      icon: <Handshake className="h-6 w-6 text-teal-600" />,
      color: "bg-teal-100",
      textColor: "text-teal-700",
      borderColor: "border-teal-200",
      image: "/images/partnerships.jpg",
    },
  ]

  export const objectives = [
    {
      title: "Research and Innovation",
      description: `
      Develop, test and promote climate-smart agricultural technologies and practices to improve productivity, reduce greenhouse gas emissions and improve resiliency.
      `,
      icon: <Leaf className="h-6 w-6 text-green-600" />,
      color: "bg-green-100",
      textColor: "text-green-700",
      borderColor: "border-green-200",
      image: "/images/sustainable-agriculture.jpg",
    },
    {
      title: " Capacity Building",
      description:`
       Develop innovative programs to increase the capacity of students, farmers, policymakers, practitioners, and other stakeholders on climate-resilient practices with a clear focus on agriculture.
      `,
      icon: <Cpu className="h-6 w-6 text-blue-600" />,
      color: "bg-blue-100",
      textColor: "text-blue-700",
      borderColor: "border-blue-200",
      image: "/images/emerging-technologies.jpg",
    },
    {
      title: "Policy and Advocacy",
      description: `
      Collaborate with government, civil society organisations (CSOs), and Non-Governmental Organisations (NGOs) to shape policies that support climate-smart agriculture.
      `,
      icon: <Briefcase className="h-6 w-6 text-amber-600" />,
      color: "bg-amber-100",
      textColor: "text-amber-700",
      borderColor: "border-amber-200",
      image: "/images/agri-entrepreneurship.jpg",
    },
    {
      title: "Public-private partnerships (PPPs)",
      description: `
      Implement impactful projects by collaborating with the private sector, farmer's unions and associations, NGOs, CSOs, and international and multilateral organisations.
      `,
      icon: <FileText className="h-6 w-6 text-purple-600" />,
      color: "bg-purple-100",
      textColor: "text-purple-700",
      borderColor: "border-purple-200",
      image: "/images/policy-advocacy.jpg",
    },
    {
      title: "Digital Transformation",
      description:`
      Leverage emerging technologies such as cloud computing, mobile technologies, AI and data analytics, IoT, satellite technologies, additive manufacturing, drones, and robotics technology to provide smallholder farmers with real-time data and precision farming solutions, improve yield and output as support resource optimisation.
      `,
      icon: <Handshake className="h-6 w-6 text-teal-600" />,
      color: "bg-teal-100",
      textColor: "text-teal-700",
      borderColor: "border-teal-200",
      image: "/images/partnerships.jpg",
    },
  ]