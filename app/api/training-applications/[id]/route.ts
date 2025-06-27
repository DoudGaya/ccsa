import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/prisma"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const applicationId = parseInt(id)
    
    if (isNaN(applicationId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 })
    }

    const application = await db.trainingApplication.findUnique({
      where: { id: applicationId },
    })

    if (!application) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 })
    }

    return NextResponse.json(application)
  } catch (error) {
    console.error("Error fetching training application:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
