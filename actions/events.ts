'use server'
import * as z from 'zod'
import { db } from '@/lib/prisma'
import { eventBookingSchema } from '@/lib/schema'

export const createEventBooking = async (data: z.infer<typeof eventBookingSchema>) => {
  try {
    const fieldValidation = eventBookingSchema.safeParse(data);
    
    if (!fieldValidation.success) {
      console.log("Validation errors:", fieldValidation.error.errors)
      return { error: "Field validation failed", details: fieldValidation.error.errors }
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

    // Check if user already booked for this event
    const existingBooking = await db.eventBooking.findFirst({
      where: {
        email,
        event,
      }
    })

    if (existingBooking) {
      return { error: "You have already booked for this event" }
    }

    const booking = await db.eventBooking.create({
      data: {
        email,
        event,
        age: parseInt(age),
        name,
        organization,
        phone,
        role,
        gender,
      }
    })

    return { success: 'Event booking successful!', booking }
  } catch (error) {
    console.error("Error creating event booking:", error)
    return { error: "Failed to book event. Please try again." }
  }
}