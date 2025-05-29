"use server"

import { db } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import * as z from "zod"

const commentSchema = z.object({
  articleSlug: z.string().min(1),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  content: z.string().min(1, "Comment is required"),
})

export async function addComment(data: z.infer<typeof commentSchema>) {
  try {
    const validatedData = commentSchema.parse(data)

    await db.comment.create({
      data: validatedData,
    })

    revalidatePath(`/articles/${validatedData.articleSlug}`)
    return { success: "Comment added successfully. It will be visible after approval." }
  } catch (error) {
    console.error("Error adding comment:", error)
    return { error: "Failed to add comment" }
  }
}

export async function getComments(articleSlug: string) {
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

export async function approveComment(id: number) {
  try {
    await db.comment.update({
      where: { id },
      data: { approved: true },
    })
    return { success: "Comment approved" }
  } catch (error) {
    console.error("Error approving comment:", error)
    return { error: "Failed to approve comment" }
  }
}
