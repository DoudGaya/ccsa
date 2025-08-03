import { Gender } from "@prisma/client"
import { z } from "zod"

export const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters long"),
})


export const customTrainingSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone is required"),
  organization: z.string().min(1, "Organization is required"),
  course: z.string().min(1, "Title of the training is required"),
})


export const VolunteerApplicationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone is required"),
  organization: z.string().min(1, "Organization is required"),
  state: z.string().min(1, "State is required"),
  localGovernment: z.string().min(1, "Local Government is required"),
  statementOfInterest: z.string().min(100, "Statement of Interest must be atleast 100 characters required"),
  yearsOfFarmingExperience: z.string().min(1, "Years of farming experience is required"),
  gender: z.enum([Gender.Female, Gender.Male]).optional(),
})



export const eventBookingSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone is required"),
  organization: z.string().min(1, "Organization is required"),
  event: z.string().min(1, "Event is required"),
  gender: z.enum([Gender.Female, Gender.Male]),
  age: z.string().min(1, "Age is required"),
  role: z.string().min(1, "Role is required"),
})



export const programApplicationSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  middleName: z.string().optional(),
  surname: z.string().min(1, "Surname is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  address: z.string().min(1, "Address is required"),
  passportNumber: z.string().min(1, "Passport number is required"),
  passportDateOfIssue: z.string().min(1, "Passport date of issue is required"),
  passportExpiryDate: z.string().min(1, "Passport expiry date is required"),
  passportCountryOfIssue: z.string().min(1, "Passport country of issue is required"),
  highestQualification: z.string().min(1, "Highest qualification is required"),
  duration: z.enum(["1month", "4month"], { required_error: "Duration is required" }),
  isCosmopolitanStudent: z.boolean(),
  course: z.string().optional(),
  program: z.string().min(1, "Program is required")
})

export const signUpSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
})

export const resetPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
})

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(6, "New password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })


// export const programApplicationSchema = z.object({
//   firstName: z.string().min(1, "First name is required"),
//   middleName: z.string().optional(),
//   duration: z.string().min(1, "Duration is required"),
//   surname: z.string().min(1, "Surname is required"),
//   dateOfBirth: z.string().min(1, "Date of birth is required"),
//   email: z.string().email("Invalid email address"),
//   phoneNumber: z.string().min(1, "Phone number is required"),
//   address: z.string().min(1, "Address is required"),
//   passportNumber: z.string().min(1, "Passport number is required"),
//   passportDateOfIssue: z.string().min(1, "Passport date of issue is required"),
//   passportExpiryDate: z.string().min(1, "Passport expiry date is required"),
//   passportCountryOfIssue: z.string().min(1, "Passport country of issue is required"),
//   highestQualification: z.string().min(1, "Highest qualification is required"),
//   isCosmopolitanStudent: z.boolean(),
//   course: z.string().optional(),
//   program: z
//     .enum(["AGRIC_TECH", "HEALTH_TECH", "ROBOTICS_INDUSTRIAL_AUTOMATION", "AI_DATA_SCIENCE_ROBOTICS"])
//     .optional(),
// })

// export const signUpSchema = z.object({
//   name: z.string().min(1, "Name is required"),
//   email: z.string().email("Invalid email address"),
//   password: z.string().min(6, "Password must be at least 6 characters"),
// })

// export const signInSchema = z.object({
//   email: z.string().email("Invalid email address"),
//   password: z.string().min(1, "Password is required"),
// })
