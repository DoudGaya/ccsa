"use server"

import { db } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function deleteRecord(model: string, id: number) {
  try {
    const modelMap: any = {
      programApplication: db.programApplication,
      trainingApplication: db.trainingApplication,
      contact: db.contact,
      volunteers: db.volunteers,
      eventBooking: db.eventBooking,
      customCourse: db.customCourse,
      user: db.user,
    }

    const dbModel = modelMap[model]
    if (!dbModel) {
      throw new Error(`Invalid model: ${model}`)
    }

    await dbModel.delete({ where: { id } })

    revalidatePath(`/dashboard/${model.replace(/([A-Z])/g, "-$1").toLowerCase()}s`)
    return { success: "Record deleted successfully" }
  } catch (error) {
    console.error(`Error deleting ${model}:`, error)
    return { error: "Failed to delete record" }
  }
}

export async function getRecord(model: string, id: number) {
  try {
    const modelMap: any = {
      programApplication: db.programApplication,
      trainingApplication: db.trainingApplication,
      contact: db.contact,
      volunteers: db.volunteers,
      eventBooking: db.eventBooking,
      customCourse: db.customCourse,
      user: db.user,
    }

    const dbModel = modelMap[model]
    if (!dbModel) {
      throw new Error(`Invalid model: ${model}`)
    }

    const record = await dbModel.findUnique({ where: { id } })
    return { data: record }
  } catch (error) {
    console.error(`Error fetching ${model}:`, error)
    return { error: "Failed to fetch record" }
  }
}

export async function updateRecord(model: string, id: number, data: any) {
  try {
    const modelMap: any = {
      programApplication: db.programApplication,
      trainingApplication: db.trainingApplication,
      contact: db.contact,
      volunteers: db.volunteers,
      eventBooking: db.eventBooking,
      customCourse: db.customCourse,
      user: db.user,
    }

    const dbModel = modelMap[model]
    if (!dbModel) {
      throw new Error(`Invalid model: ${model}`)
    }

    const updatedRecord = await dbModel.update({
      where: { id },
      data,
    })

    revalidatePath(`/dashboard/${model.replace(/([A-Z])/g, "-$1").toLowerCase()}s`)
    return { success: "Record updated successfully", data: updatedRecord }
  } catch (error) {
    console.error(`Error updating ${model}:`, error)
    return { error: "Failed to update record" }
  }
}
