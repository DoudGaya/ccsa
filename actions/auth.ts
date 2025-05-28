"use server"

import { db } from "@/lib/prisma"
import type * as z from "zod"
// import { signUpSchema, resetPasswordSchema, changePasswordSchema } from "@/lib/schemas"
import { signUpSchema, resetPasswordSchema, changePasswordSchema } from "@/lib/schema"
import bcrypt from "bcryptjs"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

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
      },
    })

    return { success: "User created successfully", user: { id: user.id, email: user.email, name: user.name } }
  } catch (error) {
    console.error("Error creating user:", error)
    return { error: "Failed to create user" }
  }
}

export const requestPasswordReset = async (values: z.infer<typeof resetPasswordSchema>) => {
  const fieldValidation = resetPasswordSchema.safeParse(values)

  if (!fieldValidation.success) {
    return { error: "Invalid email address" }
  }

  const { email } = fieldValidation.data

  try {
    // Check if user exists
    const user = await db.user.findUnique({
      where: { email },
    })

    if (!user) {
      // Don't reveal if user exists or not for security
      return { success: "If an account with that email exists, we've sent a password reset link." }
    }

    // In a real application, you would:
    // 1. Generate a secure reset token
    // 2. Store it in the database with expiration
    // 3. Send an email with the reset link

    // For now, we'll just return success
    // TODO: Implement actual email sending
    console.log(`Password reset requested for: ${email}`)

    return { success: "If an account with that email exists, we've sent a password reset link." }
  } catch (error) {
    console.error("Error requesting password reset:", error)
    return { error: "Failed to process password reset request" }
  }
}

export const changePassword = async (values: z.infer<typeof changePasswordSchema>) => {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    return { error: "Not authenticated" }
  }

  const fieldValidation = changePasswordSchema.safeParse(values)

  if (!fieldValidation.success) {
    return { error: "Field validation failed" }
  }

  const { currentPassword, newPassword } = fieldValidation.data

  try {
    // Get user from database
    const user = await db.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user || !user.password) {
      return { error: "User not found" }
    }

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password)

    if (!isCurrentPasswordValid) {
      return { error: "Current password is incorrect" }
    }

    // Hash new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10)

    // Update password
    await db.user.update({
      where: { email: session.user.email },
      data: { password: hashedNewPassword },
    })

    return { success: "Password changed successfully" }
  } catch (error) {
    console.error("Error changing password:", error)
    return { error: "Failed to change password" }
  }
}


// "use server"

// import { db } from "@/lib/prisma"
// import type * as z from "zod"
// import { signUpSchema, resetPasswordSchema, changePasswordSchema } from "@/lib/schema"
// import bcrypt from "bcryptjs"
// import { getServerSession } from "next-auth"
// import { authOptions } from "@/lib/auth"

// export const signUp = async (values: z.infer<typeof signUpSchema>) => {
//   const fieldValidation = signUpSchema.safeParse(values)

//   if (!fieldValidation.success) {
//     return { error: "Field validation failed" }
//   }

//   const { name, email, password } = fieldValidation.data

//   try {
//     // Check if user already exists
//     const existingUser = await db.user.findUnique({
//       where: { email },
//     })

//     if (existingUser) {
//       return { error: "User already exists" }
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10)

//     // Create user
//     const user = await db.user.create({
//       data: {
//         name,
//         email,
//         password: hashedPassword,
//       },
//     })

//     return { success: "User created successfully", user: { id: user.id, email: user.email, name: user.name } }
//   } catch (error) {
//     console.error("Error creating user:", error)
//     return { error: "Failed to create user" }
//   }
// }

// export const requestPasswordReset = async (values: z.infer<typeof resetPasswordSchema>) => {
//   const fieldValidation = resetPasswordSchema.safeParse(values)

//   if (!fieldValidation.success) {
//     return { error: "Invalid email address" }
//   }

//   const { email } = fieldValidation.data

//   try {
//     // Check if user exists
//     const user = await db.user.findUnique({
//       where: { email },
//     })

//     if (!user) {
//       // Don't reveal if user exists or not for security
//       return { success: "If an account with that email exists, we've sent a password reset link." }
//     }

//     // In a real application, you would:
//     // 1. Generate a secure reset token
//     // 2. Store it in the database with expiration
//     // 3. Send an email with the reset link

//     // For now, we'll just return success
//     // TODO: Implement actual email sending
//     console.log(`Password reset requested for: ${email}`)

//     return { success: "If an account with that email exists, we've sent a password reset link." }
//   } catch (error) {
//     console.error("Error requesting password reset:", error)
//     return { error: "Failed to process password reset request" }
//   }
// }

// export const changePassword = async (values: z.infer<typeof changePasswordSchema>) => {
//   const session = await getServerSession(authOptions)

//   if (!session?.user?.email) {
//     return { error: "Not authenticated" }
//   }

//   const fieldValidation = changePasswordSchema.safeParse(values)

//   if (!fieldValidation.success) {
//     return { error: "Field validation failed" }
//   }

//   const { currentPassword, newPassword } = fieldValidation.data

//   try {
//     // Get user from database
//     const user = await db.user.findUnique({
//       where: { email: session.user.email },
//     })

//     if (!user || !user.password) {
//       return { error: "User not found" }
//     }

//     // Verify current password
//     const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password)

//     if (!isCurrentPasswordValid) {
//       return { error: "Current password is incorrect" }
//     }

//     // Hash new password
//     const hashedNewPassword = await bcrypt.hash(newPassword, 10)

//     // Update password
//     await db.user.update({
//       where: { email: session.user.email },
//       data: { password: hashedNewPassword },
//     })

//     return { success: "Password changed successfully" }
//   } catch (error) {
//     console.error("Error changing password:", error)
//     return { error: "Failed to change password" }
//   }
// }
