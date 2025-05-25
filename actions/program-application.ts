"use server"

import { db } from "@/lib/prisma"
import type * as z from "zod"
import { programApplicationSchema } from "@/lib/schema"
// import { programApplicationSchema } from "@/lib/schemas"

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
    passportDateOfIssue,
    passportExpiryDate,
    passportCountryOfIssue,
    highestQualification,
    isCosmopolitanStudent,
    course,
    program,
  } = fieldValidation.data

  try {
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
        course,
        program,
      },
    })

    return { success: "Application submitted successfully", application }
  } catch (error) {
    console.error("Error creating application:", error)
    return { error: "Failed to submit application" }
  }
}
