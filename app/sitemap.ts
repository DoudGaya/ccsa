import type { MetadataRoute } from "next"
import { client } from "@/sanity/lib/client"
import { groq } from "next-sanity"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://ccsa.cosmopolitan.edu.ng"

  // Static routes
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/programs`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/agri-investment`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/news-and-events`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    },
     {
      url: `${baseUrl}/knowledge-hub`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    },
      {
      url: `${baseUrl}/agritech-tools`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/knowledge-hub`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/volunteer`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    },
  ]

  // Fetch all activities
  const activitySlugs = await client.fetch(groq`
    *[_type == "activity"] {
      "slug": slug.current,
      _updatedAt
    }
  `)

  const activityRoutes = activitySlugs.map((activity: { slug: string, _updatedAt: string }) => ({
    url: `${baseUrl}/activities/${activity.slug}`,
    lastModified: new Date(activity._updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))


  const newsSlugs = await client.fetch(groq`
    *[_type == "news"] {
      "slug": slug.current,
      _updatedAt
    }
  `)

  const newsRoutes = newsSlugs.map((news: { slug: string, _updatedAt: string }) => ({
    url: `${baseUrl}/news/${news.slug}`,
    lastModified: new Date(news._updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }))

  // Fetch all programs (if you have those)
  const programSlugs = await client.fetch(groq`
    *[_type == "program"] {
      "slug": slug.current,
      _updatedAt
    }
  `)

//   const programRoutes = programSlugs.map((program: { slug: string, _updatedAt: string }) => ({
//     url: `${baseUrl}/programs/${program.slug}`,
//     lastModified: new Date(program._updatedAt),
//     changeFrequency: "monthly" as const,
//     priority: 0.8,
//   }))

  // Combine all routes
  return [
    ...staticRoutes,
    ...activityRoutes,
    ...newsRoutes,
    // ...programRoutes,
  ]
}
