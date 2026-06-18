"use server"

import { db } from "@/lib/prisma"
import type * as z from "zod"
import { programApplicationSchema } from "@/lib/schema" // Add this import

export const createProgramApplication = async (values: z.infer<typeof programApplicationSchema>) => {
  const fieldValidation = programApplicationSchema.safeParse(values)

  if (!fieldValidation.success) {
    return { error: "Field validation failed" }
  }

  const {
    firstName,
    middleName,
    surname,
    dateOfBirth,
    email,
    phoneNumber,
    address,
    passportNumber,
    duration,
    passportDateOfIssue,
    passportExpiryDate,
    passportCountryOfIssue,
    highestQualification,
    isCosmopolitanStudent,
    course,
    program,
  } = fieldValidation.data

  try {
    const existing = await db.programApplication.findFirst({
      where: { email },
    })

    if (existing) {
      return { error: 'duplicate', errorMessage: 'An application with this email address has already been submitted. Please check your inbox or contact us if you need assistance.' }
    }

    const application = await db.programApplication.create({
      data: {
        firstName,
        middleName,
        surname,
        dateOfBirth: new Date(dateOfBirth),
        email,
        phoneNumber,
        address,
        passportNumber,
        passportDateOfIssue: new Date(passportDateOfIssue),
        passportExpiryDate: new Date(passportExpiryDate),
        passportCountryOfIssue,
        highestQualification,
        isCosmopolitanStudent,
        duration,
        course,
        program,
      },
    })

    return { success: "Application submitted successfully", application }
  } catch (error: any) {
    if (error?.code === 'P2002') {
      return { error: 'duplicate', errorMessage: 'An application with this email address has already been submitted. Please check your inbox or contact us if you need assistance.' }
    }
    console.error("Error creating application:", error)
    return { error: "Failed to submit application. Please try again later." }
  }
}
