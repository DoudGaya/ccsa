"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent } from "@/components/ui/dialog"
// import { getSanityImageUrl } from "../utils/getSanityImageUrl"
import { getSanityImageUrl } from "@/lib/getSanityImageUrl"
import { SanityTypes } from "@/@types"


const getYouTubeEmbedUrl = (url: any) => {
    if (!url) return null;
    
    // Handle different YouTube URL formats
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
    
    // If already an embed URL, return as is
    if (url.includes('youtube.com/embed/')) {
      return url;
    }
    
    return null;
  };

export default function MediaList({ mediaItems }: { mediaItems: SanityTypes.Media[] }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const [videoError, setVideoError] = useState<any>({});

  return (
    <section className="container mx-auto px-4 py-8">
      {mediaItems.map((item) => (
        <div key={item._id} className="flex flex-col lg:flex-row mb-12 gap-8">
          <div className="lg:w-1/2">
            <h2 className="text-2xl font-blog font-bold mb-4">{item.title}</h2>
            <p className="text-gray-600 font-blog mb-4">{item.description}</p>
            {item.tags && (
              <div className="flex flex-wrap gap-2 mb-4">
                {item.tags.map((tag) => (
                  <span key={tag} className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-sm">
                    { tag }
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="lg:w-1/2">
          {item.video ? (
              <div className="w-full h-auto rounded-lg shadow-lg overflow-hidden">
                {videoError[item._id] ? (
                  <div className="bg-gray-100 p-4 text-center rounded-lg">
                    <p className="text-gray-600">Unable to load video. Please check the URL.</p>
                  </div>
                ) : (
                  <iframe
                    width="100%"
                    height="350"
                    src={getYouTubeEmbedUrl(item.video)}
                    title={item.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    onError={() => setVideoError((prev: any) => ({ ...prev, [item._id]: true }))}
                  />
                )}
              </div>
            ) : item.images && item.images.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {item.images.map((image, index) => (
                  <div key={index} className="relative aspect-square">
                    <Image
                      src={getSanityImageUrl(image)}
                      alt={`${item.title} - Image ${index + 1}`}
                      fill
                      className="object-cover rounded-lg cursor-pointer transition-transform hover:scale-105"
                      onClick={() => setSelectedImage(getSanityImageUrl(image))}
                    />
                  </div>
                ))}
              </div>
            ) : null}
            {/* {item.video ? (
              <div className="w-full h-auto rounded-lg shadow-lg">
                <iframe
                  width="100%"
                  height="315"
                  src={item.video}
                  title={item.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen 
                ></iframe>
              </div>
            ) : item.images && item.images.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {item.images.map((image, index) => (
                  <div key={index} className="relative aspect-square">
                    <Image
                      src={getSanityImageUrl(image)}
                      alt={`${item.title} - Image ${index + 1}`}
                      fill
                      className="object-cover rounded-lg cursor-pointer transition-transform hover:scale-105"
                      onClick={() => setSelectedImage(getSanityImageUrl(image))}
                    />
                  </div>
                ))}
              </div>
            ) : null} */}
          </div>
        </div>
      ))}

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl">
          {selectedImage && (
            <div className="relative w-full aspect-video">
              <Image src={selectedImage || "/placeholder.svg"} alt="Enlarged view" fill className="object-contain" />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}

