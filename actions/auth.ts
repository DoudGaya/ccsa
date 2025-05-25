"use server"

import { db } from "@/lib/prisma"
import type * as z from "zod"
import { signUpSchema } from "@/lib/schema"
import bcrypt from "bcryptjs"

export const signUp = async (values: z.infer<typeof signUpSchema>) => {
  const fieldValidation = signUpSchema.safeParse(values)

  if (!fieldValidation.success) {
    return { error: "Field validation failed" }
  }

  const { name, email, password } = fieldValidation.data

  try {
    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return { error: "User already exists" }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "USER", // Add a default role if your schema requires it
      },
    })

    return { success: "User created successfully", user: { id: user.id, email: user.email, name: user.name } }
  } catch (error) {
    // Use a safer way to log errors
    console.error("Error creating user:", error instanceof Error ? error.message : String(error))
    return { error: "Failed to create user" }
  }
}
