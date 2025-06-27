"use server"

import { db } from "@/lib/prisma"
import { sendEmail, generateApprovalEmail, generateRejectionEmail } from "@/lib/email"
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
