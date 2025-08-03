"use client"

import { useState, useEffect } from "react"
import { Share2, Facebook, Twitter, Linkedin, Link, Copy, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"

interface SocialShareProps {
  title: string
  url: string
  description?: string
}

export default function SocialShare({ title, url, description }: SocialShareProps) {
  const [copied, setCopied] = useState(false)
  const [shareUrl, setShareUrl] = useState(url)
  
  // Update shareUrl with absolute URL once component mounts
  useEffect(() => {
    // Ensure we have an absolute URL with proper protocol
    if (typeof window !== 'undefined') {
      // If URL is relative, make it absolute
      if (!url.startsWith('http')) {
        const baseUrl = window.location.origin
        setShareUrl(`${baseUrl}${url.startsWith('/') ? '' : '/'}${url}`)
      } else {
        setShareUrl(url)
      }
      
      console.log("Final share URL:", shareUrl)
    }
  }, [url])

  const encodedTitle = encodeURIComponent(title)
  const encodedUrl = encodeURIComponent(shareUrl)
  const encodedDescription = encodeURIComponent(description || "")
  
  // Prepare combined text for WhatsApp and clipboard
  const combinedText = `${title}${description ? '\n\n' + description : ''}\n\n${shareUrl}`
  const encodedCombinedText = encodeURIComponent(combinedText)

  const shareLinks = {
    // Facebook sharing
    facebook: `https://www.facebook.com/dialog/share?app_id=145634995501895&display=popup&href=${encodedUrl}&quote=${encodedTitle}${encodedDescription ? ': ' + encodedDescription : ''}`,
    
    // Twitter sharing
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}${description ? '&hashtags=CCSA,ClimateAction' : ''}`,
    
    // LinkedIn sharing - using more reliable parameters
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    
    // WhatsApp sharing
    whatsapp: `https://wa.me/?text=${encodedCombinedText}`
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(combinedText)
      setCopied(true)
      toast("Copied to clipboard!", {
        icon: "✅",
        description: "Article details copied to clipboard.",
      })
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("Copy failed:", error)
      toast("Error", {
        icon: "❌",
        description: "Failed to copy to clipboard.",
      })
    }
  }

  const openShareWindow = (url: string, platform: string) => {
    console.log(`Opening ${platform} share window with URL:`, url)
    window.open(url, "_blank", "width=700,height=500,scrollbars=yes,resizable=yes")
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
            onClick={() => openShareWindow(shareLinks.facebook, "Facebook")}
            className="flex items-center border-blue-600 gap-2"
          >
            <Facebook className="h-4 stroke-blue-500 w-4" />
            Facebook
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => openShareWindow(shareLinks.twitter, "Twitter")}
            className="flex items-center border-blue-400 gap-2"
          >
            <Twitter className="h-4 stroke-blue-500 w-4" />
            Twitter
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => openShareWindow(shareLinks.linkedin, "LinkedIn")}
            className="flex border-blue-500 items-center gap-2"
          >
            <Linkedin className="h-4 stroke-blue-500 w-4" />
            LinkedIn
          </Button>
          
          {/* Added WhatsApp share button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => openShareWindow(shareLinks.whatsapp, "WhatsApp")}
            className="flex border-green-500 items-center gap-2"
          >
            <MessageCircle className="h-4 stroke-green-600 w-4" />
            WhatsApp
          </Button>

          <Button 
            variant="outline" 
            size="sm" 
            onClick={copyToClipboard} 
            className="flex bg-gray-100 items-center gap-2"
          >
            {copied ? <Copy className="h-4 stroke-blue-500 w-4" /> : <Link className="h-4 stroke-blue-500 w-4" />}
            {copied ? "Copied!" : "Copy Link"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
