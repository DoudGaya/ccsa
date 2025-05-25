import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Professional Development Programs",
  description:
    "Advanced training programs in agricultural technology, health tech, robotics, and AI at CCSA Cosmopolitan University Abuja.",
  openGraph: {
    title: "Professional Development Programs | CCSA",
    description: "Advanced training programs in emerging technologies for agricultural innovation.",
    images: ["/programs-og.jpg"],
  },
}

export default function ProgramsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
