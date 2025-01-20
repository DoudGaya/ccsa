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
    description: "Our commitment to fostering climate-resilient agricultural systems.",
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

const researchItems: { title: string; href: string; description: string }[] = [
  {
    title: "Climate-Smart Technologies",
    href: "/research/climate-smart-tech",
    description: "Developing and testing innovative agricultural technologies for improved resilience.",
  },
  {
    title: "Sustainable Irrigation",
    href: "/research/sustainable-irrigation",
    description: "Refining water management systems for optimal resource utilization.",
  },
  {
    title: "Hybrid Crops",
    href: "/research/hybrid-crops",
    description: "Breeding climate-resistant crop varieties to enhance food security.",
  },
]

const innovationItems: { title: string; href: string; description: string }[] = [
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
]


export function NavMenu() {
  return (
    <div className="flex bg-black/40 rounded-md items-center">
      <MobileNavMenu />
      <NavigationMenu className="hidden md:flex">
        <NavigationMenuList className=" text-white active:text-white focus:text-white focus-within:text-white">
          <NavigationMenuItem>
            <NavigationMenuTrigger>About CCSA</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[600px] lg:grid-cols-2">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      href="/about"
                    >
                      <div className="mb-2 mt-4 text-lg font-medium">
                        Centre for Climate-Smart Agriculture
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Advancing sustainable and resilient agricultural practices through research, innovation, and collaboration.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                {aboutItems.map((item) => (
                  <ListItem key={item.title} title={item.title} href={item.href}>
                    {item.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Research</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {researchItems.map((item) => (
                  <ListItem key={item.title} title={item.title} href={item.href}>
                    {item.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
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
            <Link href="/news" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                 News
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/knowledge-hub" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Activities
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/contact" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Contact
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
//     description: "Our commitment to fostering climate-resilient agricultural systems.",
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

