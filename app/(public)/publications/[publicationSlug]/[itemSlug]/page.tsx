import React from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowDownToLine, ArrowLeft, CalendarDays, Tag } from 'lucide-react'
import { getPublicationDetail } from '@/sanity/lib/quesries/publicationQueries'
import { SanityTypes } from '@/@types'
import { Button } from '@/components/ui/button'
import PublicationAccessRequestModal from '../../_components/PublicationAccessRequestModal'
import PublicBanners from '@/app/components/PublicBanners'

type Params = {
  publicationSlug: string
  itemSlug: string
}

const page = async ({ params }: { params: Promise<Params> }) => {
  const { publicationSlug, itemSlug } = await params

  const publication = await getPublicationDetail(publicationSlug, itemSlug) as SanityTypes.Publication | null

  if (!publication) return notFound()

  const { publicationType } = publication
  const descriptionLabel = publicationType.descriptionLabel ?? 'Description'
  const isJournal = publicationType.category === 'journal'
  const isDocument = publicationType.category === 'document'
  const requiresAccessRequest = isJournal || isDocument
  const downloadUrl = publication.fileUrl || publication.url

  return (
    <div className="flex flex-col">
      {/* Site banner */}
      <PublicBanners
        title={publicationType.title}
        message={publicationType.description}
        imageUrl={publicationType.bannerImage}
      />

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-8 w-full">
        {/* Back */}
        <Link
          href={`/publications/${publicationType.slug}`}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="size-4" />
          Back to {publicationType.title}
        </Link>

        {/* Header */}
        <div className="space-y-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
            {publicationType.title}
          </span>
          <h1 className="text-3xl font-bold font-main leading-snug">{publication.title}</h1>

          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            {publication.date && (
              <span className="flex items-center gap-1.5">
                <CalendarDays className="size-4" />
                {new Date(publication.date).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
            )}
            <Link href={`/authors/${publication.author?.slug}`} className="hover:underline hover:text-primary">
              Published by: <span className="font-semibold">{publication.author?.name}</span>
            </Link>
          </div>

          {/* Tags */}
          {publication.tags && publication.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {publication.tags.map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1 text-xs bg-muted px-2 py-0.5 rounded-full text-muted-foreground">
                  <Tag className="size-3" /> {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Document Preview — shown at top for journal/document types */}
        {requiresAccessRequest && (
          <section className="space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Document Preview</h2>

            {/* Image preview — shown if editor has uploaded one */}
            {publication.previewImageUrl ? (
              <div className="relative w-full rounded-lg overflow-hidden border shadow-sm">
                <Image
                  src={publication.previewImageUrl}
                  alt={`Preview of ${publication.title}`}
                  width={900}
                  height={600}
                  className="w-full object-cover object-top"
                  unoptimized
                />
                {/* Gradient fade hinting there's more content */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white/90 to-transparent pointer-events-none" />
              </div>
            ) : downloadUrl ? (
              /* Clipped iframe fallback — top ~380px of first page, no interaction */
              <div className="relative w-full rounded-lg overflow-hidden border shadow-sm bg-muted" style={{ height: '380px' }}>
                <iframe
                  src={`${downloadUrl}#page=1&toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                  className="w-full pointer-events-none"
                  style={{ height: '842px', border: 'none' }}
                  title={`Preview of ${publication.title}`}
                />
                {/* Gradient blocks the rest of the page */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/95 to-transparent pointer-events-none" />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed bg-muted py-16 text-muted-foreground space-y-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                </svg>
                <p className="text-sm">No preview available</p>
              </div>
            )}

            <div className="flex items-center gap-3">
              <PublicationAccessRequestModal
                publicationId={publication._id}
                publicationTitle={publication.title}
              />
              <p className="text-sm text-muted-foreground">
                Request access to download the full document.
              </p>
            </div>
          </section>
        )}

        <hr />

        {/* Description / Abstract */}
        <section className="space-y-2">
          <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">{descriptionLabel}</h2>
          <p className="text-base leading-relaxed text-justify">{publication.description}</p>
        </section>

        {/* Journal authors list */}
        {isJournal && publication.authors && publication.authors.length > 0 && (
          <section className="space-y-2">
            <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Article Authors</h2>
            <ul className="flex flex-wrap gap-2">
              {publication.authors.map((author, i) => (
                <li
                  key={i}
                  className="text-sm bg-green-50 border border-green-200 text-green-900 px-3 py-1 rounded-full"
                >
                  {author}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Other types with a file: direct download */}
        {!requiresAccessRequest && downloadUrl && (
          <div className="pt-2">
            <Button asChild>
              <a href={downloadUrl} download className="inline-flex items-center gap-2">
                <ArrowDownToLine className="size-4" />
                Download
              </a>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default page
