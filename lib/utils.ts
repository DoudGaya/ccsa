import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface Activity  {
  title: string
  description: string
  heroImage: string
  location: string
  badge: string
  slug?: string
  date: string
  images?: string[]
}


export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}




export const homeActivities: Activity[] = [
  {
    title: 'Agriculrural Development Workshop',
    description: 'Agriculrural Development Workshop is a workshop that is aimed at training farmers on the best practices in agriculture',
    heroImage: '/assets/img/agriculture.jpg',
    location: 'Abuja, Nigeria',
    date: '12th October, 2021',
    badge: 'New',
    images: [
      '/assets/img/agriculture.jpg',
      '/assets/img/agriculture.jpg',
      '/assets/img/agriculture.jpg',
      '/assets/img/agriculture.jpg',
    ]
  },
  {
    title: 'Agriculrural Development Workshop',
    description: 'Agriculrural Development Workshop is a workshop that is aimed at training farmers on the best practices in agriculture',
    heroImage: '/assets/img/agriculture.jpg',
    location: 'Abuja, Nigeria',
    date: '12th October, 2021',
    badge: 'Event',
    images: [
      '/assets/img/agriculture.jpg',
      '/assets/img/agriculture.jpg',
      '/assets/img/agriculture.jpg',
      '/assets/img/agriculture.jpg',
    ]
  },
  {
    title: 'Agriculrural Development Workshop',
    description: 'Agriculrural Development Workshop is a workshop that is aimed at training farmers on the best practices in agriculture',
    heroImage: '/assets/img/agriculture.jpg',
    location: 'Abuja, Nigeria',
    date: '12th October, 2021',
    badge: 'Update',
    images: [
      '/assets/img/agriculture.jpg',
      '/assets/img/agriculture.jpg',
      '/assets/img/agriculture.jpg',
      '/assets/img/agriculture.jpg',
    ]
  },
  {
    title: 'Agriculrural Development Workshop',
    description: 'Agriculrural Development Workshop is a workshop that is aimed at training farmers on the best practices in agriculture',
    heroImage: '/assets/img/agriculture.jpg',
    location: 'Abuja, Nigeria',
    date: '12th October, 2021',
    badge: 'Announcement',
    images: [
      '/assets/img/agriculture.jpg',
      '/assets/img/agriculture.jpg',
      '/assets/img/agriculture.jpg',
      '/assets/img/agriculture.jpg',
    ]
  }

]
