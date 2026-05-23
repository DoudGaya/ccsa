import { SanityTypes } from '@/@types'
import React from 'react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDownToLine } from "lucide-react"

const SinglePublication = ( {publication}: {publication: SanityTypes.Publication} ) => {

  const downloadUrl = publication.fileUrl || publication.url
  const descriptionLabel = publication.publicationType.descriptionLabel ?? 'Description'
  const isJournal = publication.publicationType.category === 'journal'
  const isDocument = publication.publicationType.category === 'document'
  const requiresAccessRequest = isJournal || isDocument
  const typeSlug = publication.publicationType.slug
  
  return (
    <Card className="w-full max-w-md flex flex-col">
    <CardHeader>
      <Link href={`/publications/${typeSlug}/${publication.slug}`}>
        <CardTitle className="text-xl font-main font-semibold hover:underline hover:text-primary transition-colors">{publication.title}</CardTitle>
      </Link>
    </CardHeader>
    <CardContent className="flex-1">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">{descriptionLabel}</p>
      <p className="text-sm font-main text-justify text-muted-foreground mb-4 line-clamp-4">{publication.description}</p>

      {isJournal && publication.authors && publication.authors.length > 0 && (
        <div className="mb-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">Authors</p>
          <ul className="flex flex-wrap gap-1">
            {publication.authors.map((author, i) => (
              <li key={i} className="text-xs bg-green-50 border border-green-200 text-green-900 px-2 py-0.5 rounded-full">{author}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="text-sm">
        <Link href={`/authors/${publication.author.slug}`} className="text-primary rounded-xl hover:underline">
          <span>Published by: </span>
          <span className="font-semibold ml-1">{publication.author.name}</span>
        </Link>
      </div>
    </CardContent>
    <CardFooter className="flex justify-between items-center">
      <span className="text-sm bg-blue-200 px-3 py-1 rounded-lg text-blue-950">{publication.publicationType.title}</span>

      {requiresAccessRequest ? (
        <Button variant="outline" size="sm" asChild>
          <Link href={`/publications/${typeSlug}/${publication.slug}`}>
            View Details
          </Link>
        </Button>
      ) : downloadUrl ? (
        <Button variant="outline" size="sm" asChild>
          <a href={downloadUrl} download>
            <ArrowDownToLine className="h-4 w-4" />
          </a>
        </Button>
      ) : null}
    </CardFooter>
  </Card>

  )
}

export default SinglePublication