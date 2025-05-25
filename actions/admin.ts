"use server"

import { db } from "@/lib/prisma"

export async function getDashboardStats() {
  try {
    const [
      totalApplications,
      totalContacts,
      totalVolunteers,
      totalTrainingApplications,
      totalEventBookings,
      totalCustomCourses,
      totalUsers,
    ] = await Promise.all([
      db.programApplication.count(),
      db.contact.count(),
      db.volunteers.count(),
      db.trainingApplication.count(),
      db.eventBooking.count(),
      db.customCourse.count(),
      db.user.count(),
    ])

    return {
      totalApplications,
      totalContacts,
      totalVolunteers,
      totalTrainingApplications,
      totalEventBookings,
      totalCustomCourses,
      totalUsers,
    }
  } catch (error) {
    console.error("Error fetching dashboard stats:", error)
    return {
      totalApplications: 0,
      totalContacts: 0,
      totalVolunteers: 0,
      totalTrainingApplications: 0,
      totalEventBookings: 0,
      totalCustomCourses: 0,
      totalUsers: 0,
    }
  }
}

export async function getMonthlyData() {
  try {
    const currentYear = new Date().getFullYear()
    const months = Array.from({ length: 12 }, (_, i) => i + 1)

    const monthlyData = await Promise.all(
      months.map(async (month) => {
        const startDate = new Date(currentYear, month - 1, 1)
        const endDate = new Date(currentYear, month, 0)

        const [applications, contacts, volunteers] = await Promise.all([
          db.programApplication.count({
            where: {
              createdAt: {
                gte: startDate,
                lte: endDate,
              },
            },
          }),
          db.contact.count({
            where: {
              createdAt: {
                gte: startDate,
                lte: endDate,
              },
            },
          }),
          db.volunteers.count({
            where: {
              createdAt: {
                gte: startDate,
                lte: endDate,
              },
            },
          }),
        ])

        return {
          name: new Date(currentYear, month - 1).toLocaleDateString("en-US", { month: "short" }),
          applications,
          contacts,
          volunteers,
        }
      }),
    )

    return monthlyData
  } catch (error) {
    console.error("Error fetching monthly data:", error)
    return []
  }
}

export async function getProgramDistribution() {
  try {
    const programCounts = await db.programApplication.groupBy({
      by: ["program"],
      _count: {
        program: true,
      },
    })

    const programNames: Record<string, string> = {
      AGRIC_TECH: "Agric Tech",
      HEALTH_TECH: "Health Tech",
      ROBOTICS_INDUSTRIAL_AUTOMATION: "Robotics",
      AI_DATA_SCIENCE_ROBOTICS: "AI & Data Science",
      CHINA_CLIMATE_SMART_AGRICULTURE_1M: "China Agric (1M)",
      CHINA_CLIMATE_SMART_AGRICULTURE_4M: "China Agric (4M)",
      CHINA_ADVANCED_TECHNOLOGIES_1M: "China Tech (1M)",
      CHINA_ADVANCED_TECHNOLOGIES_4M: "China Tech (4M)",
      CHINA_HEALTH_SCIENCES_1M: "China Health (1M)",
      CHINA_HEALTH_SCIENCES_4M: "China Health (4M)",
    }

    return programCounts.map((item) => ({
      name: programNames[item.program || ""] || "Unknown",
      value: item._count.program,
    }))
  } catch (error) {
    console.error("Error fetching program distribution:", error)
    return []
  }
}

// Generic function to get paginated data with search
export async function getPaginatedData(
  model: string,
  page = 1,
  limit = 10,
  search = "",
  filters: Record<string, any> = {},
) {
  try {
    const skip = (page - 1) * limit

    const whereClause: any = { ...filters }

    // Add search functionality based on model
    if (search) {
      switch (model) {
        case "programApplication":
          whereClause.OR = [
            { firstName: { contains: search, mode: "insensitive" } },
            { surname: { contains: search, mode: "insensitive" } },
            { email: { contains: search, mode: "insensitive" } },
          ]
          break
        case "contact":
          whereClause.OR = [
            { name: { contains: search, mode: "insensitive" } },
            { email: { contains: search, mode: "insensitive" } },
            { subject: { contains: search, mode: "insensitive" } },
          ]
          break
        case "volunteers":
          whereClause.OR = [
            { name: { contains: search, mode: "insensitive" } },
            { email: { contains: search, mode: "insensitive" } },
            { organization: { contains: search, mode: "insensitive" } },
          ]
          break
        case "trainingApplication":
          whereClause.OR = [
            { name: { contains: search, mode: "insensitive" } },
            { email: { contains: search, mode: "insensitive" } },
            { organization: { contains: search, mode: "insensitive" } },
          ]
          break
        case "eventBooking":
          whereClause.OR = [
            { name: { contains: search, mode: "insensitive" } },
            { email: { contains: search, mode: "insensitive" } },
            { organization: { contains: search, mode: "insensitive" } },
          ]
          break
        case "customCourse":
          whereClause.OR = [
            { name: { contains: search, mode: "insensitive" } },
            { email: { contains: search, mode: "insensitive" } },
            { organization: { contains: search, mode: "insensitive" } },
          ]
          break
        case "user":
          whereClause.OR = [
            { name: { contains: search, mode: "insensitive" } },
            { email: { contains: search, mode: "insensitive" } },
          ]
          break
      }
    }

    const modelMap: any = {
      programApplication: db.programApplication,
      contact: db.contact,
      volunteers: db.volunteers,
      trainingApplication: db.trainingApplication,
      eventBooking: db.eventBooking,
      customCourse: db.customCourse,
      user: db.user,
    }

    const dbModel = modelMap[model]
    if (!dbModel) {
      throw new Error(`Invalid model: ${model}`)
    }

    const [data, total] = await Promise.all([
      dbModel.findMany({
        where: whereClause,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      dbModel.count({ where: whereClause }),
    ])

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    }
  } catch (error) {
    console.error(`Error fetching ${model} data:`, error)
    return {
      data: [],
      total: 0,
      page: 1,
      limit: 10,
      totalPages: 0,
    }
  }
}
