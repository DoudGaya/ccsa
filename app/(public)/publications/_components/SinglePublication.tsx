import { SanityTypes } from '@/@types'
import React from 'react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDownToLine } from "lucide-react"

const SinglePublication = ( {publication}: {publication: SanityTypes.Publication} ) => {

  const downloadUrl = publication.fileUrl || publication.url
  
  return (
    <Card className="w-full max-w-md">
    <CardHeader>
      <CardTitle className="text-xl font-main font-semibold">{publication.title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-sm font-main text-justify text-muted-foreground mb-4">{publication.description}</p>
      <div className="text-sm">
        <Link href={`/authors/${publication.author.slug}`} className="text-primary rounded-xl hover:underline">
        <span>Published by: </span>
        <span className="font-semibold ml-1">{publication.author.name}</span>
        </Link>
       
      </div>
    </CardContent>
    <CardFooter className="flex justify-between items-center">
      <span className="text-sm bg-blue-200 px-3 py-1 rounded-lg text-blue-950 ">{publication.publicationType.title}</span>
      {downloadUrl && (
        <Button variant="outline" size="sm" asChild>
          <a href={downloadUrl} download>
            <ArrowDownToLine className=" h-4 w-4" />
          </a>
        </Button>
      )}
    </CardFooter>
  </Card>

  )
}

export default SinglePublication