"use client"

import Image from "next/image"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PlayCircle } from "lucide-react"
import { SanityTypes } from "@/@types"

interface MediaItem {
  _id: string
  title: string
  description: string | null
  video: string | null
  images: {
    _type: "image"
    _key: string
    asset: {
      _ref: string
      _type: "reference"
    }
  }[]
  tags: string[]
  slug: {
    current: string
    _type: "slug"
  }
}

interface MediaShowcaseProps {
  items: SanityTypes.Media[]
}

export default function MediaShowcase({ items }: MediaShowcaseProps) {
  return (
    <div className="container mx-auto py-12">
      {items.map((item) => (
        <Card key={item._id} className="mb-12 overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2">
              <MediaGrid item={item} />
            </div>
            <CardContent className="w-full md:w-1/2 p-6">
              <h2 className="text-2xl font-bold mb-4">{item.title}</h2>
              {item.description && <p className="text-muted-foreground mb-4">{item.description}</p>}
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </div>
        </Card>
      ))}
    </div>
  )
}

function MediaGrid({ item }: { item: SanityTypes.Media }) {
  const [selectedIndex, setSelectedIndex] = useState(0)

  const getImageUrl = (ref: string) => {
    // Extract the image details from the _ref
    const [_file, id, dimensions, format] = ref.split("-")
    // Construct the Sanity CDN URL
    return `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/production/${id}-${dimensions}.${format}`
  }

  if (item.video) {
    return (
      <div className="relative aspect-video">
        <iframe
          src={item.video}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>
    )
  }

  if (item.images && item.images.length > 0) {
    return (
      <div className="grid grid-cols-3 gap-2 p-2">
        <div className="col-span-2 row-span-2 relative aspect-square overflow-hidden rounded-lg">
          <Image
            src={getImageUrl(item.images[selectedIndex].asset._ref) || "/placeholder.svg"}
            alt={item.title}
            fill
            className="object-cover"
          />
        </div>
        {item.images.slice(0, 3).map((image, index) => (
          <div
            key={image._key}
            className={`relative aspect-square overflow-hidden rounded-lg cursor-pointer ${
              index === selectedIndex ? "ring-2 ring-primary" : ""
            }`}
            onClick={() => setSelectedIndex(index)}
          >
            <Image
              src={getImageUrl(image.asset._ref) || "/placeholder.svg"}
              alt={`${item.title} ${index + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center h-full bg-muted">
      <PlayCircle className="w-16 h-16 text-muted-foreground" />
    </div>
  )
}

