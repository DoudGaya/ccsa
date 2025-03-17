"use server"

import { contactSchema } from "@/lib/schema"
import { db } from "@/lib/prisma"


export async function submitContactForm(formData: FormData) {
  const validatedFields = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  })


  if (!validatedFields.success) {
    return { success: false, errors: validatedFields.error.flatten().fieldErrors }
  }

  await new Promise((resolve) => setTimeout(resolve, 1000))

  return { success: true, message: "Thank you for your message. We'll get back to you soon!" }
}

