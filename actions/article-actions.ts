"use server"

import { db } from "@/lib/prisma"
import { headers } from "next/headers"

export async function trackArticleView(articleSlug: string) {
  try {
    const headersList = await headers()
    const ipAddress = headersList.get("x-forwarded-for") || headersList.get("x-real-ip") || "unknown"
    const userAgent = headersList.get("user-agent") || "unknown"

    // Try to create a new view, ignore if already exists for this IP
    await db.articleView.upsert({
      where: {
        articleSlug_ipAddress: {
          articleSlug,
          ipAddress,
        },
      },
      update: {
        createdAt: new Date(),
      },
      create: {
        articleSlug,
        ipAddress,
        userAgent,
      },
    })

    return { success: true }
  } catch (error) {
    console.error("Error tracking article view:", error)
    return { error: "Failed to track view" }
  }
}

export async function getArticleViews(articleSlug: string) {
  try {
    const count = await db.articleView.count({
      where: { articleSlug },
    })
    return { data: count }
  } catch (error) {
    console.error("Error fetching article views:", error)
    return { error: "Failed to fetch views" }
  }
}

export async function getCommentsRealTime(articleSlug: string) {
  try {
    const comments = await db.comment.findMany({
      where: {
        articleSlug,
        approved: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })
    return { data: comments }
  } catch (error) {
    console.error("Error fetching comments:", error)
    return { error: "Failed to fetch comments" }
  }
}
