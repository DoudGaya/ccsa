"use client"

import { useState } from "react"
import { Share2, Facebook, Twitter, Linkedin, Link, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { toast } from "@/hooks/use-toast"
import { toast } from "sonner"

interface SocialShareProps {
  title: string
  url: string
  description?: string
}

export default function SocialShare({ title, url, description }: SocialShareProps) {
  const [copied, setCopied] = useState(false)

  const shareUrl = typeof window !== "undefined" ? window.location.href : url
  const encodedTitle = encodeURIComponent(title)
  const encodedUrl = encodeURIComponent(shareUrl)
  const encodedDescription = encodeURIComponent(description || title)

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      toast( "Link copied!",{
        icon: "✅",
        description: "Article link has been copied to clipboard.",
      })
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      toast( "Error", {
        icon: "❌",
        description: "Failed to copy link to clipboard.",
      })
    }
  }

  const openShareWindow = (url: string) => {
    window.open(url, "_blank", "width=600,height=400,scrollbars=yes,resizable=yes")
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Share2 className="h-5 w-5" />
          Share this article
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => openShareWindow(shareLinks.facebook)}
            className="flex items-center border-blue-600 gap-2"
          >
            <Facebook className="h-4 stroke-blue-500 w-4" />
            Facebook
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => openShareWindow(shareLinks.twitter)}
            className="flex items-center border-blue-400 gap-2"
          >
            <Twitter className="h-4 stroke-blue-500 w-4" />
            Twitter
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => openShareWindow(shareLinks.linkedin)}
            className="flex border-blue-500 items-center gap-2"
          >
            <Linkedin className="h-4 stroke-blue-500 w-4" />
            LinkedIn
          </Button>

          <Button variant="outline" size="sm" onClick={copyToClipboard} className="flex bg-gray-100 items-center gap-2">
            {copied ? <Copy className="h-4 stroke-blue-500 w-4" /> : <Link className="h-4 stroke-blue-500 w-4" />}
            {copied ? "Copied!" : "Copy Link"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
