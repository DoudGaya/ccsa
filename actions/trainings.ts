'use server'
import { db } from "@/lib/prisma"
import * as z from 'zod'
import { applicationSchema } from "@/sanity/lib/zod/schemas";



export const createApplication = async (values: z.infer<typeof applicationSchema >) => {
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


  return {success: 'Application created'}
     return { success: "Application has been Submitted", application: application}

}
