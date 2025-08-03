"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { MobileNavMenu } from "./mobile-nav-menu"

const aboutItems: { title: string; href: string; description: string }[] = [
  {
    title: "Vision & Mission",
    href: "/about/vision-mission",
    description: "Our commitment to fostering climate-smart agricultural systems.",
  },
  {
    title: "Objectives",
    href: "/about/objectives",
    description: "Key goals driving our research, innovation, and capacity building efforts.",
  },
  {
    title: "Partnerships",
    href: "/about/partnerships",
    description: "Our collaborations with global and local organizations to drive agricultural transformation.",
  },
]

export const publicationsItems = [
  "Policy Briefs",
  "Project Reports",
  "Annual Reports",
  "Journal Articles or Book Chapters",
  "Conference and Seminar Presentations",
  "Case Studies",
  "Github Repositories",
]

export const corporateGovernance = [
  {
    title: "Advistory Board",
    href: "/about/advisory-board",
    description: "Meet our advisory board members and their contributions.",
  },
  {
    title: "Management Team",
    href: "/about/management-team",
    description: "Meet the team driving the Centre's research and innovation initiatives.",
  },
  {
    title: "Research Fellows",
    href: "/about/research-fellows",
    description: "Meet our research fellows and learn about their areas of expertise.",
  },
  {
    title: "Standings Committees",
    href: "/about/standing-committees",
    description: "Learn about the committees that oversee the Centre's operations and activities.",
  },
  {
    title: "Research Ethics",
    href: "/about/ethics/research-ethics",
    description: "Our commitment to ethical research practices and data privacy.",
  },
  {
    title: "Work Ethics",
    href: "/about/ethics/work-ethics",
    description: "Our commitment to fostering a safe and inclusive work environment.",
  }
]

export const trainings = [
  {
    id: 0,
    url: "/trainings/agribusiness-proficiency-course",
    title: "Agribusiness Proficiency Course",
    subtitle: "Master the fundamentals of agricultural business management and operations"
  },

  {
    id: 1,
    url: "/trainings/certificate-in-artificial-intelligence-for-climate-smart-agriculture-caicsa",
    title: "Certificate in Artificial Intelligence for Climate-Smart Agriculture (CAICSA)",
    subtitle: "Learn how to apply AI technologies to enhance climate-smart agricultural practices"
  },

  {
    id: 2,
    url: "/trainings/certificate-in-climate-smart-agriculture-with-artificial-intelligence-craai",
    title: "Certificate in climate-smart Agriculture with Artificial Intelligence (CRAAI)",
    subtitle: "Develop skills to build resilient agricultural systems using AI-driven solutions"
  },

  {
    id: 3,
    url: "/trainings/certificate-in-ai-powered-climate-smart-agriculture-and-sustainability-capcsas",
    title: "Certificate in AI-Powered Climate-Smart Agriculture and Sustainability (CAPCSAS)",
    subtitle: "Explore sustainable agricultural practices enhanced by artificial intelligence"
  },

  {
    id: 4,
    url: "/trainings/certificate-in-machine-learning-and-artificial-intelligence-for-climate-smart-agriculture",
    title: "Certificate in Machine Learning and Artificial Intelligence for Climate-Smart Agriculture (MLAICSA)",
    subtitle: "Master machine learning techniques specifically tailored for agricultural applications"
  },

  {
    id: 5,
    url: "/trainings/certificate-in-climate-smart-agriculture-with-ai-machine-learning-and-data-science-csa-aimlds",
    title: "Certificate in Climate-Smart Agriculture with AI, Machine Learning, and Data Science (CSA-AIMLDS)",
    subtitle: "Comprehensive training in data science and AI methods for climate-smart agriculture"
  }
  
]

export const researchItems: { title: string; href: string; description: string }[] = [
  {
    title: "Sustainable Practice",
    description:
      "Sustainably Advance Climate-Smart Agricultural Practices for Enhanced Food and Nutrition Security.",
    href: "/research/climate-smart-agriculture",
  },
  {
    title: "Emerging Technologies",
    description:
      "Leverage CU emerging technologies at the maker space to promote digital and data analytics transformation in Agriculture.",
    href: "/research/emerging-technologies",
  },
  {
    title: "Agri-Entrepreneurship",
    description:
      "Provide training and capacity-building programs for farmers, extension agents, and other stakeholders.",
    href: "/research/ag-entrepreneurship",
  },
  {
    title: "Policy and Advocacy",
    description:
      "Promote resilience and adaptation to environmental changes through policy, advocacy and stakeholder engagement.",
    href: "/research/policy-advocacy",
  },
  {
    title: "Partnerships",
    description:
      "Foster partnerships with national and international organizations to leverage resources and expertise.",
    href: "/research/partnerships",
  },
]

export const mediaItems = ["Agri-institutions", "Documentaries", "Interviews", "YouTube", "Live TV"]
// export const mediaItems = ["Photos", "Documentaries", "Interviews", "YouTube", "Webinar", "Activities", "Live TV"]

export const innovationItems: { title: string; href: string; description: string }[] = [
  {
    title: "Digital Platforms",
    href: "/innovation/digital-platforms",
    description: "Real-time data and analytics for informed agricultural decision-making.",
  },
  {
    title: "Agri-tech Tools",
    href: "/innovation/agri-tech-tools",
    description: "Cutting-edge technologies for precision farming and resource optimization.",
  },
  {
    title: "Farmer Incubation",
    href: "/innovation/farmer-incubation",
    description: "Supporting entrepreneurial ventures in climate-smart agriculture.",
  },
  {
    title: "Value-Added Agriculture",
    href: "/innovation/investment-opportunities",
    description: "Investment opportunities in Value-Added Agriculture.",
  },
  // {
  //   title: "Data Analytics",
  //   href: "/innovation/data-analytics",
  //   description: "Harnessing data for improved agricultural practices and decision-making.",
  // },
  // {
  //   title: "Sustainable Practices",
  //   href: "/innovation/sustainable-practices",
  //   description: "Promoting sustainable agricultural practices for long-term viability.",
  // }
]


export function NavMenu() {
  return (
    <div className="flex rounded-md items-center">
      <MobileNavMenu  />
      <NavigationMenu className="hidden md:flex">
        <NavigationMenuList className=" text-white active:text-white focus:text-white focus-within:text-white">
          <NavigationMenuItem dir="right">
            <NavigationMenuTrigger>About</NavigationMenuTrigger>
            <NavigationMenuContent dir="right">
              <ul className="grid gap-3 p-6 md:w-[500px] lg:w-[800px] lg:grid-cols-3">
                <div className="row-span-3 col-span-2 w-full">
                  {/* <NavigationMenuLink asChild> */}
                    <div
                      className="flex p-2 w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted no-underline outline-none focus:shadow-md"
                     
                    >
                      <a href="/about" className="mb-2 text-lg font-medium">
                        Corporate Governance
                      </a>
                      
                      <ul className=" grid col-span-2 gap-4 grid-cols-2">
                          {corporateGovernance.map((item) => (
                          <ListItem key={item.title} className=" px-2" title={item.title} href={item.href}>
                            {item.description}
                          </ListItem>
                        ))}
                      </ul>
                    </div>
                  
                  {/* </NavigationMenuLink> */}
                </div>
                <div className=" w-full ">
                <div
                      className="flex w-full select-none flex-col justify-end rounded-md px-4 py-6 no-underline outline-none focus:shadow-md"
                     
                    >
                       <a href="/about" className="mb-2 text-lg font-medium">
                          About CCSA
                    </a>
               <ul className=" ">
               
                  {aboutItems.map((item) => (
                      <ListItem key={item.title} className=" px-2" title={item.title} href={item.href}>
                        {item.description}
                      </ListItem>
                    ))}
               </ul>
                </div>
              </div>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
          <NavigationMenuTrigger>Mandate Areas</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {researchItems.map((item) => (
                <ListItem key={item.title} title={item.title} href={item.href}>
                  {item.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Publications</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {publicationsItems.map((item) => (
                <ListItem key={item} title={item} href={`/publications/${item.toLowerCase().replace(/ /g, "-")}`}>
                  {item}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-3 lg:w-[600px]">
              {mediaItems.map(
                (item) => (
                  <Link key={item} title={item} href={`/resources/${item.toLowerCase().replace(/ /g, "-")}`}>
                    {item}
                  </Link>
                ),
              )}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
       
        {/* <NavigationMenuItem>
          <Link href={'/trainings'} passHref>
          <NavigationMenuTrigger>Trainings</NavigationMenuTrigger>
          </Link>
          <NavigationMenuContent>
            <ul className="grid grid-cols-2 w-[800px] gap-3 p-4">
          { trainings.map((course) => {
            return (
                <ListItem key={course.id} title={course.title} href={course.url}>
                 {course.subtitle}
                </ListItem>
            )
          }
        )}
        </ul>
        </NavigationMenuContent>
        </NavigationMenuItem> */}
          <NavigationMenuItem>
            <NavigationMenuTrigger>Innovation Hub</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {innovationItems.map((item) => (
                  <ListItem key={item.title} title={item.title} href={item.href}>
                    {item.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
          <Link href="/trainings" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Trainings
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/news-and-events" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                News and Events
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/activities" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Activities
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"



// "use client"

// import * as React from "react"
// import Link from "next/link"

// import { cn } from "@/lib/utils"
// import {
//   NavigationMenu,
//   NavigationMenuContent,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
//   NavigationMenuTrigger,
//   navigationMenuTriggerStyle,
// } from "@/components/ui/navigation-menu"

// const aboutItems: { title: string; href: string; description: string }[] = [
//   {
//     title: "Vision & Mission",
//     href: "/about/vision-mission",
//     description: "Our commitment to fostering climate-smart agricultural systems.",
//   },
//   {
//     title: "Objectives",
//     href: "/about/objectives",
//     description: "Key goals driving our research, innovation, and capacity building efforts.",
//   },
//   {
//     title: "Partnerships",
//     href: "/about/partnerships",
//     description: "Our collaborations with global and local organizations to drive agricultural transformation.",
//   },
// ]

// const researchItems: { title: string; href: string; description: string }[] = [
//   {
//     title: "Climate-Smart Technologies",
//     href: "/research/climate-smart-tech",
//     description: "Developing and testing innovative agricultural technologies for improved resilience.",
//   },
//   {
//     title: "Sustainable Irrigation",
//     href: "/research/sustainable-irrigation",
//     description: "Refining water management systems for optimal resource utilization.",
//   },
//   {
//     title: "Hybrid Crops",
//     href: "/research/hybrid-crops",
//     description: "Breeding climate-resistant crop varieties to enhance food security.",
//   },
// ]

// const innovationItems: { title: string; href: string; description: string }[] = [
//   {
//     title: "Digital Platforms",
//     href: "/innovation/digital-platforms",
//     description: "Real-time data and analytics for informed agricultural decision-making.",
//   },
//   {
//     title: "Agri-tech Tools",
//     href: "/innovation/agri-tech-tools",
//     description: "Cutting-edge technologies for precision farming and resource optimization.",
//   },
//   {
//     title: "Farmer Incubation",
//     href: "/innovation/farmer-incubation",
//     description: "Supporting entrepreneurial ventures in climate-smart agriculture.",
//   },
// ]

// export function NavMenu() {
//   return (
//     <NavigationMenu>
//       <NavigationMenuList>
//         <NavigationMenuItem>
//           <NavigationMenuTrigger>About CCSA</NavigationMenuTrigger>
//           <NavigationMenuContent>
//             <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
//               <li className="row-span-3">
//                 <NavigationMenuLink asChild>
//                   <a
//                     className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
//                     href="/"
//                   >
//                     <div className="mb-2 mt-4 text-lg font-medium">
//                       Centre for Climate-Smart Agriculture
//                     </div>
//                     <p className="text-sm leading-tight text-muted-foreground">
//                       Advancing sustainable and resilient agricultural practices through research, innovation, and collaboration.
//                     </p>
//                   </a>
//                 </NavigationMenuLink>
//               </li>
//               {aboutItems.map((item) => (
//                 <ListItem key={item.title} title={item.title} href={item.href}>
//                   {item.description}
//                 </ListItem>
//               ))}
//             </ul>
//           </NavigationMenuContent>
//         </NavigationMenuItem>
//         <NavigationMenuItem>
//           <NavigationMenuTrigger>Research</NavigationMenuTrigger>
//           <NavigationMenuContent>
//             <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
//               {researchItems.map((item) => (
//                 <ListItem key={item.title} title={item.title} href={item.href}>
//                   {item.description}
//                 </ListItem>
//               ))}
//             </ul>
//           </NavigationMenuContent>
//         </NavigationMenuItem>
//         <NavigationMenuItem>
//           <NavigationMenuTrigger>Innovation Hub</NavigationMenuTrigger>
//           <NavigationMenuContent>
//             <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
//               {innovationItems.map((item) => (
//                 <ListItem key={item.title} title={item.title} href={item.href}>
//                   {item.description}
//                 </ListItem>
//               ))}
//             </ul>
//           </NavigationMenuContent>
//         </NavigationMenuItem>
//         <NavigationMenuItem>
//           <Link href="/knowledge-hub" legacyBehavior passHref>
//             <NavigationMenuLink className={navigationMenuTriggerStyle()}>
//               Knowledge Hub
//             </NavigationMenuLink>
//           </Link>
//         </NavigationMenuItem>
//         <NavigationMenuItem>
//           <Link href="/contact" legacyBehavior passHref>
//             <NavigationMenuLink className={navigationMenuTriggerStyle()}>
//               Contact
//             </NavigationMenuLink>
//           </Link>
//         </NavigationMenuItem>
//       </NavigationMenuList>
//     </NavigationMenu>
//   )
// }

// const ListItem = React.forwardRef<
//   React.ElementRef<"a">,
//   React.ComponentPropsWithoutRef<"a">
// >(({ className, title, children, ...props }, ref) => {
//   return (
//     <li>
//       <NavigationMenuLink asChild>
//         <a
//           ref={ref}
//           className={cn(
//             "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
//             className
//           )}
//           {...props}
//         >
//           <div className="text-sm font-medium leading-none">{title}</div>
//           <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
//             {children}
//           </p>
//         </a>
//       </NavigationMenuLink>
//     </li>
//   )
// })
// ListItem.displayName = "ListItem"

