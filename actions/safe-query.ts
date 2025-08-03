"use server"

import { db } from "@/lib/prisma"

export async function safeGetTrainingApplications() {
  try {
    console.log("Attempting safe fetch of training applications...")
    
    // Try the simplest possible query first
    const apps = await db.trainingApplication.findMany({
      take: 1
    })
    
    console.log("Safe query successful, found:", apps.length, "applications")
    
    return {
      success: true,
      data: apps,
      count: apps.length
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error("Safe query failed:", errorMessage)
    
    // Try alternative approaches
    try {
      // Check if table exists using raw SQL
      const tableCheck = await db.$queryRaw`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' AND table_name = 'rsvp'
      `
      console.log("Table check result:", tableCheck)
      
      return {
        success: false,
        error: `Database error: ${errorMessage}`,
        tableExists: Array.isArray(tableCheck) && tableCheck.length > 0,
        data: [],
        count: 0
      }
    } catch (rawError) {
      return {
        success: false,
        error: `Critical database error: ${rawError instanceof Error ? rawError.message : 'Unknown error'}`,
        tableExists: false,
        data: [],
        count: 0
      }
    }
  }
}
