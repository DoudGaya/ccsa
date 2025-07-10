"use server"

import { db } from "@/lib/prisma"

export async function getSimpleTrainingApplications() {
  try {
    console.log("Fetching simple training applications...")
    
    const applications = await db.trainingApplication.findMany({
      take: 10,
      orderBy: {
        createdAt: 'desc'
      }
    })
    
    console.log(`Found ${applications.length} applications`)
    
    return {
      success: true,
      data: applications,
      count: applications.length
    }
  } catch (error) {
    console.error("Error fetching training applications:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      data: [],
      count: 0
    }
  }
}
