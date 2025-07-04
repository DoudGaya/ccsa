import { Gender } from '@prisma/client'
import * as z from 'zod'
import { QUALIFICATION_VALUES } from '@/lib/constants'

export const applicationSchema = z.object({
    firstName: z.string().min(2, {
      message: "Title must be at least 2 characters",
    }),
      middleName: z.string().min(2, {
      message: "Title must be at least 2 characters",
    }),
      lastName: z.string().min(2, {
      message: "Title must be at least 2 characters",
    }),
    email: z.string().email({
        message: "Please add a valid email",
    }),
    qualifications: z.enum(QUALIFICATION_VALUES as [string, ...string[]]).optional(),
    phone: z.string().min(2, {
        message: "Phone must be at least 2 characters",
    }),
    organization: z.string().min(2, {
        message: "Organization must be at least 2 characters",
    }),
    gender: z.enum([Gender.Female, Gender.Male]),
    role: z.string().min(2, {
        message: "Role must be at least 2 characters",
    }),
    age: z.string().min(1, {
        message: "Please add your age",
    }),
    training: z.string().min(2, {
        message: "Course must be at least 2 characters",
    }),
  })