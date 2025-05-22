'use server'
import * as z from 'zod'
import { db } from '@/lib/prisma'
import { eventBookingSchema } from '@/lib/schema'



export const createEventBooking = async (data: z.infer<typeof eventBookingSchema>) => {

     const fieldValidation = eventBookingSchema.safeParse(data);
        if (!fieldValidation.success) {
             return { error: "field Validation failed " }
        }
        const { 
            name,
            email,
            phone,
            organization,
            gender,
            age,
            role,
            event,
         } = fieldValidation.data
    
     
         const application = await db.eventBooking.create({
           data: {
            email,
            event,
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