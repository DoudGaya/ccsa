'use server'
import { db } from "@/lib/prisma"
import * as z from 'zod'
import { applicationSchema } from "@/sanity/lib/zod/schemas";
import { customTrainingSchema, VolunteerApplicationSchema } from "@/lib/schema";



export const createApplication = async (values: z.infer<typeof applicationSchema>) => {
    const fieldValidation = applicationSchema.safeParse(values);

    if (!fieldValidation.success) {
         return { error: "field Validation failed " }
    }
    const { 
        name,
        email,
        gender,
        age,
        organization,
        phone,
        role,
        training,
     } = fieldValidation.data
     const application = await db.trainingApplication.create({
       data: {
        email,
        training,
        age : parseInt(age),
        name,
        organization,
        phone,
        role,
        gender,
       }
     })
  return {success: 'Application Successfully', application}
}



export const volunteerApplicationAction = async (values: z.infer<typeof VolunteerApplicationSchema>) => {
  const fieldValidation = VolunteerApplicationSchema.safeParse(values);

  if (!fieldValidation.success) {
       return { error: "field Validation failed " }
  }
  const { 
      name,
      email,
      phone,
      organization,
      state,
      localGovernment,
      statementOfInterest,
      yearsOfFarmingExperience,
   } = fieldValidation.data

    const application = await db.volunteers.create({
      data: {
        email,
        name,
        organization,
        phone,
        state,
        localGovernment,
        statementOfInterest,
        yearsOfFarmingExperience: parseInt(yearsOfFarmingExperience)
      }
    })

  return {success: 'Application Successfully', application}

 }


export const customTrainingAction = async (values: z.infer<typeof customTrainingSchema>) => {
  const fieldValidation = customTrainingSchema.safeParse(values);

  if (!fieldValidation.success) {
       return { error: "field Validation failed " }
  }
  const { 
      name,
      email,
      phone,
      organization,
      course,
   } = fieldValidation.data
   const application = await db.customCourse.create({
     data: {
      email,
      course,
      name,
      organization,
      phone,
     }
   })

return {success: 'Application Successfully', application}
}