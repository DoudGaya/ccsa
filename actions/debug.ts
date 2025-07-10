"use server"

import { db } from "@/lib/prisma"

export async function testDatabaseConnection() {
  try {
    console.log("Testing database connection...")
    
    // Test basic connection
    const result = await db.$queryRaw`SELECT 1 as test`
    console.log("Database connection test result:", result)
    
    // Test if the rsvp table exists
    try {
      const tableExists = await db.$queryRaw`SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'rsvp'
      )`
      console.log("RSVP table exists check:", tableExists)
    } catch (tableError) {
      console.log("Table existence check failed:", tableError instanceof Error ? tableError.message : 'Unknown error')
    }
    
    // Test training applications table access
    const count = await db.trainingApplication.count()
    console.log("Training applications count:", count)
    
    // Test fetching a few records
    const sample = await db.trainingApplication.findMany({
      take: 2,
      select: {
        id: true,
        firstName: true,
        email: true
      }
    })
    console.log("Sample training applications:", sample)
    
    return {
      success: true,
      count,
      sample
    }
  } catch (error) {
    console.error("Database connection error:", error instanceof Error ? error.message : 'Unknown error')
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}
