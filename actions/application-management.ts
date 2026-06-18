"use server"

import { db } from "@/lib/prisma"
import { sendEmail, generateApprovalEmail, generateRejectionEmail, generateCustomTrainingEmail } from "@/lib/email"
import { sendSMS } from "@/lib/sms"
import { revalidatePath } from "next/cache"

export async function approveApplication(id: number, type: "program" | "training") {
  try {
    if (type === "program") {
      const application = await db.programApplication.update({
        where: { id },
        data: { status: "APPROVED" },
      })

      // Send approval email
      await sendEmail({
        to: application.email,
        subject: "Application Approved - CCSA Program",
        html: await generateApprovalEmail(
          `${application.firstName} ${application.surname}`,
          application.program || "Program",
        ),
      })
      await sendSMS(
        application.phoneNumber,
        `Dear ${application.firstName}, your application for ${application.program || "the program"} has been approved! Check your email for next steps. - CCSA`
      )

      revalidatePath("/dashboard/program-applications")
      return { success: "Application approved and email sent" }
    } else {
      const application = await db.trainingApplication.update({
        where: { id },
        data: { status: "APPROVED" },
      })

      await sendEmail({
        to: application.email,
        subject: "Training Application Approved - CCSA",
        html: await generateApprovalEmail(application.firstName, application.training),
      })
      await sendSMS(
        application.phone,
        `Dear ${application.firstName}, your application for ${application.training} has been approved! Check your email for next steps. - CCSA`
      )

      revalidatePath("/dashboard/training-applications")
      return { success: "Training application approved and email sent" }
    }
  } catch (error) {
    console.error("Error approving application:", error)
    return { error: "Failed to approve application" }
  }
}

export async function rejectApplication(id: number, type: "program" | "training", reason?: string) {
  try {
    if (type === "program") {
      const application = await db.programApplication.update({
        where: { id },
        data: { status: "REJECTED" },
      })

      await sendEmail({
        to: application.email,
        subject: "Application Status Update - CCSA Program",
        html: await generateRejectionEmail(
          `${application.firstName} ${application.surname}`,
          application.program || "Program",
          reason,
        ),
      })
      await sendSMS(
        application.phoneNumber,
        `Dear ${application.firstName}, we have an update on your application for ${application.program || "the program"}. Please check your email for details. - CCSA`
      )

      revalidatePath("/dashboard/program-applications")
      return { success: "Application rejected and email sent" }
    } else {
      const application = await db.trainingApplication.update({
        where: { id },
        data: { status: "REJECTED" },
      })

      await sendEmail({
        to: application.email,
        subject: "Training Application Status Update - CCSA",
        html: await generateRejectionEmail(application.firstName, application.training, reason),
      })
      await sendSMS(
        application.phone,
        `Dear ${application.firstName}, we have an update on your application for ${application.training}. Please check your email for details. - CCSA`
      )

      revalidatePath("/dashboard/training-applications")
      return { success: "Training application rejected and email sent" }
    }
  } catch (error) {
    console.error("Error rejecting application:", error)
    return { error: "Failed to reject application" }
  }
}

export async function deleteApplication(id: number, type: "program" | "training") {
  try {
    if (type === "program") {
      await db.programApplication.delete({ where: { id } })
      revalidatePath("/dashboard/program-applications")
    } else {
      await db.trainingApplication.delete({ where: { id } })
      revalidatePath("/dashboard/training-applications")
    }
    return { success: "Application deleted successfully" }
  } catch (error) {
    console.error("Error deleting application:", error)
    return { error: "Failed to delete application" }
  }
}

export async function getApplicationDetails(id: number, type: "program" | "training") {
  try {
    if (type === "program") {
      const application = await db.programApplication.findUnique({ where: { id } })
      return { data: application }
    } else {
      const application = await db.trainingApplication.findUnique({ where: { id } })
      return { data: application }
    }
  } catch (error) {
    console.error("Error fetching application:", error)
    return { error: "Failed to fetch application details" }
  }
}

export async function updateTrainingApplication(id: number, data: any) {
  try {
    const application = await db.trainingApplication.update({
      where: { id },
      data: {
        firstName: data.firstName,
        middleName: data.middleName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        organization: data.organization,
        gender: data.gender,
        age: parseInt(data.age),
        role: data.role,
        training: data.training,
        status: data.status,
      },
    })

    revalidatePath("/dashboard/training-applications")
    return { success: "Training application updated successfully", data: application }
  } catch (error: any) {
    console.error("Error updating training application:", error)

    // Handle unique constraint violation for email
    if (error.code === "P2002" && error.meta?.target?.includes("email")) {
      return { error: "This email address is already registered for another training application" }
    }

    return { error: "Failed to update training application" }
  }
}

export async function sendTrainingApplicationEmail(id: number, subject: string, message: string) {
  try {
    const application = await db.trainingApplication.findUnique({ where: { id } })

    if (!application) {
      return { error: "Training application not found" }
    }

    await sendEmail({
      to: application.email,
      subject,
      html: await generateCustomTrainingEmail(
        `${application.firstName} ${application.middleName || ""} ${application.lastName}`.replace(/\s+/g, " ").trim(),
        application.training,
        subject,
        message,
      ),
    })
    
    // Also try to send a brief SMS for custom messages
    await sendSMS(
      application.phone,
      `Dear ${application.firstName}, you have a new message from CCSA regarding ${application.training}. Please check your email.`
    )

    revalidatePath(`/dashboard/training-applications/${id}`)
    return { success: "Custom email sent successfully" }
  } catch (error) {
    console.error("Error sending custom training application email:", error)
    return { error: "Failed to send custom email" }
  }
}
