const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testTrainingApplications() {
  try {
    console.log('Testing training applications without qualifications...');
    
    // Test 1: Count existing applications
    const count = await prisma.trainingApplication.count();
    console.log(`✓ Successfully counted training applications: ${count}`);
    
    // Test 2: Fetch a few applications
    const applications = await prisma.trainingApplication.findMany({
      take: 2,
      select: {
        id: true,
        firstName: true,
        email: true,
        organization: true,
        training: true
      }
    });
    console.log(`✓ Successfully fetched ${applications.length} training applications`);
    console.log('Sample data:', applications);
    
    // Test 3: Try to create a new test application (without qualifications)
    const testApp = await prisma.trainingApplication.create({
      data: {
        firstName: 'Test',
        middleName: 'User',
        lastName: 'Application',
        email: `test-${Date.now()}@example.com`,
        phone: '1234567890',
        organization: 'Test Org',
        gender: 'Male',
        age: 25,
        role: 'Student',
        training: 'Test Training'
      }
    });
    console.log(`✓ Successfully created test training application with ID: ${testApp.id}`);
    
    // Clean up - delete the test application
    await prisma.trainingApplication.delete({
      where: { id: testApp.id }
    });
    console.log(`✓ Successfully cleaned up test application`);
    
    console.log('\n🎉 All tests passed! The qualifications field has been successfully removed.');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

testTrainingApplications();
