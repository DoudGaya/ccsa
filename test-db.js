const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function testConnection() {
  try {
    console.log('Testing database connection...')
    
    // Test basic connection
    const userCount = await prisma.user.count()
    console.log('User count:', userCount)
    
    // Test training applications
    const trainingApps = await prisma.trainingApplication.findMany({
      take: 5
    })
    console.log('Training applications:', trainingApps.length)
    console.log('Sample training app:', trainingApps[0])
    
  } catch (error) {
    console.error('Database connection error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testConnection()
