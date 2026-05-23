"use server"

import { z } from "zod"
import { db } from "@/lib/prisma"
import { sendEmail, generateAccessRequestConfirmationEmail, generateAccessRequestAdminEmail } from "@/lib/email"

const accessRequestSchema = z.object({
  publicationId: z.string().min(1),
  publicationTitle: z.string().min(1),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("A valid email address is required"),
  organization: z.string().optional(),
  reason: z.string().optional(),
})

export async function submitAccessRequest(formData: {
  publicationId: string
  publicationTitle: string
  name: string
  email: string
  organization?: string
  reason?: string
}) {
  const validated = accessRequestSchema.safeParse(formData)

  if (!validated.success) {
    return { success: false, errors: validated.error.flatten().fieldErrors }
  }

  const { publicationId, publicationTitle, name, email, organization, reason } = validated.data

  await db.publicationAccessRequest.create({
    data: {
      publicationId,
      publicationTitle,
      name,
      email,
      organization: organization ?? null,
      reason: reason ?? null,
    },
  })

  const adminEmail = process.env.ADMIN_EMAIL
  if (adminEmail) {
    await sendEmail({
      to: adminEmail,
      subject: `New Access Request: ${publicationTitle}`,
      html: await generateAccessRequestAdminEmail(name, email, organization, publicationTitle, reason),
    })
  }

  await sendEmail({
    to: email,
    subject: `Access Request Received – ${publicationTitle}`,
    html: await generateAccessRequestConfirmationEmail(name, publicationTitle),
  })

  return { success: true }
}
