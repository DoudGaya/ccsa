'use server'
import { db } from "@/lib/prisma"
import * as z from 'zod'
import { applicationSchema } from "@/sanity/lib/zod/schemas";
import { customTrainingSchema, VolunteerApplicationSchema } from "@/lib/schema";
import { sendEmail, generateTrainingSubmissionEmail, generateTrainingSubmissionAdminEmail } from "@/lib/email"



export const createApplication = async (values: z.infer<typeof applicationSchema>) => {
    const fieldValidation = applicationSchema.safeParse(values);

    if (!fieldValidation.success) {
         return { error: "field Validation failed " }
    }
    const { 
        firstName,
        middleName,
        lastName,
        email,
        gender,
        age,
        organization,
        phone,
        role,
        training,
     } = fieldValidation.data
     try {
       const application = await db.trainingApplication.create({
         data: {
          email,
          training,
          age : parseInt(age),
          firstName,
          middleName,
          lastName,
          organization,
          phone,
          role,
          gender,
         }
       })

       const applicantName = [firstName, middleName, lastName].filter(Boolean).join(" ").trim() || firstName
       const adminEmail = process.env.ADMIN_EMAIL

       await sendEmail({
         to: email,
         subject: `Training application received - ${training}`,
         html: await generateTrainingSubmissionEmail(applicantName, training),
       })

       if (adminEmail) {
         await sendEmail({
           to: adminEmail,
           subject: `New training application - ${training}`,
           html: await generateTrainingSubmissionAdminEmail(applicantName, email, training),
         })
       }

       return {success: 'Application Successfully', application, redirectUrl: "/trainings/success"}
     } catch (error: any) {
       if (error?.code === 'P2002') {
         return { error: 'duplicate', errorMessage: 'An application with this email address has already been submitted. Please check your inbox or contact us if you need assistance.' }
       }
       console.error('Error creating training application:', error)
       return { error: 'Failed to submit application. Please try again later.' }
     }
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