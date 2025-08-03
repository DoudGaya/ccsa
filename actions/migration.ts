"use server"

import { db } from "@/lib/prisma"

export async function addQualificationsColumn() {
  try {
    console.log("Checking if qualifications column exists...")
    
    // Check if the column already exists
    const columnExists = await db.$queryRaw`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'rsvp' AND column_name = 'qualifications'
    `
    
    console.log("Column check result:", columnExists)
    
    if (Array.isArray(columnExists) && columnExists.length === 0) {
      console.log("Adding qualifications column...")
      
      // Add the qualifications column
      await db.$executeRaw`
        ALTER TABLE rsvp ADD COLUMN qualifications TEXT
      `
      
      console.log("Qualifications column added successfully!")
      
      return {
        success: true,
        message: "Qualifications column added successfully!"
      }
    } else {
      return {
        success: true,
        message: "Qualifications column already exists"
      }
    }
  } catch (error) {
    console.error("Error adding qualifications column:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}
