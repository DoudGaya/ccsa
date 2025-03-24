import { Gender } from "@prisma/client"
import { z } from "zod"

export const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters long"),
})


export const customTrainingSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone is required"),
  organization: z.string().min(1, "Organization is required"),
  course: z.string().min(1, "Title of the training is required"),
})



export const eventBookingSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone is required"),
  organization: z.string().min(1, "Organization is required"),
  event: z.string().min(1, "Event is required"),
  gender: z.enum([Gender.Female, Gender.Male]),
  age: z.string().min(1, "Age is required"),
  role: z.string().min(1, "Role is required"),
})