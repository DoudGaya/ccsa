"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { submitAccessRequest } from "@/actions/publications"

interface PublicationAccessRequestModalProps {
  publicationId: string
  publicationTitle: string
}

export default function PublicationAccessRequestModal({
  publicationId,
  publicationTitle,
}: PublicationAccessRequestModalProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string[]>>({})

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setErrors({})

    const form = e.currentTarget
    const data = {
      publicationId,
      publicationTitle,
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      organization: (form.elements.namedItem("organization") as HTMLInputElement).value || undefined,
      reason: (form.elements.namedItem("reason") as HTMLTextAreaElement).value || undefined,
    }

    const result = await submitAccessRequest(data)

    if (result.success) {
      setSubmitted(true)
    } else if (result.errors) {
      setErrors(result.errors as Record<string, string[]>)
    }

    setLoading(false)
  }

  function handleOpenChange(val: boolean) {
    setOpen(val)
    if (!val) {
      setSubmitted(false)
      setErrors({})
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button>Request Access</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Request Access</DialogTitle>
          <DialogDescription>
            Fill in the form below to request access to <strong>{publicationTitle}</strong>. Our team will review your
            request and get back to you.
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="py-6 text-center space-y-3">
            <div className="flex justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-14 text-green-600"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold">Request Submitted</h3>
            <p className="text-sm text-muted-foreground">
              Thank you! We have received your request and will contact you at the email address provided.
            </p>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>Close</Button>
            </DialogFooter>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="name">Full Name <span className="text-destructive">*</span></Label>
              <Input id="name" name="name" placeholder="Dr. Jane Smith" required />
              {errors.name && <p className="text-xs text-destructive">{errors.name[0]}</p>}
            </div>

            <div className="space-y-1">
              <Label htmlFor="email">Email Address <span className="text-destructive">*</span></Label>
              <Input id="email" name="email" type="email" placeholder="jane@example.com" required />
              {errors.email && <p className="text-xs text-destructive">{errors.email[0]}</p>}
            </div>

            <div className="space-y-1">
              <Label htmlFor="organization">Organisation <span className="text-muted-foreground text-xs">(optional)</span></Label>
              <Input id="organization" name="organization" placeholder="University / Institution / Company" />
            </div>

            <div className="space-y-1">
              <Label htmlFor="reason">Reason for Request <span className="text-muted-foreground text-xs">(optional)</span></Label>
              <Textarea
                id="reason"
                name="reason"
                placeholder="Briefly describe how you intend to use this publication..."
                rows={3}
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={loading}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Submitting…" : "Submit Request"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
