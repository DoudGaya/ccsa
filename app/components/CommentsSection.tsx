"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { MessageCircle, Send, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { addComment, getComments } from "@/actions/comments"
import { toast } from "@/hooks/use-toast"

const commentSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  content: z.string().min(1, "Comment is required"),
})

type CommentFormData = z.infer<typeof commentSchema>

interface Comment {
  id: number
  name: string
  content: string
  createdAt: string
}

interface CommentsSectionProps {
  articleSlug: string
}

export default function CommentsSection({ articleSlug }: CommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CommentFormData>({
    resolver: zodResolver(commentSchema),
  })

  useEffect(() => {
    fetchComments()
  }, [articleSlug])

  const fetchComments = async () => {
    try {
      const result = await getComments(articleSlug)
      if (result.data) {
        const formattedComments = result.data.map(comment => ({
          id: comment.id,
          name: comment.name,
          content: comment.content,
          createdAt: comment.createdAt.toString()
        }));
        setComments(formattedComments)
      }
    } catch (error) {
      console.error("Error fetching comments:", error)
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async (data: CommentFormData) => {
    setSubmitting(true)
    try {
      const result = await addComment({
        ...data,
        articleSlug,
      })

      if (result.success) {
        toast({
          title: "Success!",
          description: result.success,
        })
        reset()
        // Optionally refresh comments if auto-approved
        // fetchComments()
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to add comment",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="space-y-8">
      {/* Comments List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Comments ({comments.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : comments.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-8">
              No comments yet. Be the first to comment!
            </p>
          ) : (
            <div className="space-y-6">
              {comments.map((comment) => (
                <div key={comment.id} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0">
                  <div className="flex items-start gap-3">
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-2">
                      <User className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium text-gray-900 dark:text-gray-100">{comment.name}</h4>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {formatDate(comment.createdAt)}
                        </span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{comment.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Comment Form */}
      <Card>
        <CardHeader>
          <CardTitle>Leave a Comment</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input id="name" {...register("name")} className={errors.name ? "border-red-500" : ""} />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              </div>
            </div>

            <div>
              <Label htmlFor="content">Comment *</Label>
              <Textarea
                id="content"
                rows={4}
                placeholder="Share your thoughts..."
                {...register("content")}
                className={errors.content ? "border-red-500" : ""}
              />
              {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>}
            </div>

            <Button type="submit" disabled={submitting} className="flex items-center gap-2">
              {submitting ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <Send className="h-4 w-4" />
              )}
              {submitting ? "Posting..." : "Post Comment"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
