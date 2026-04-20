import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // Create default roles if they don't exist
  const adminRole = await prisma.role.upsert({
    where: { name: 'SUPER_ADMIN' },
    update: {},
    create: {
      name: 'SUPER_ADMIN',
      description: 'System Administrator with full access'
    }
  });

  const teacherRole = await prisma.role.upsert({
    where: { name: 'TEACHER' },
    update: {},
    create: {
      name: 'TEACHER',
      description: 'Faculty / Course Instructor'
    }
  });

  const studentRole = await prisma.role.upsert({
    where: { name: 'STUDENT' },
    update: {},
    create: {
      name: 'STUDENT',
      description: 'Enrolled Student'
    }
  });

  // Create Francisco SM Admin User
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@apra.edu.com' },
    update: {},
    create: {
      email: 'admin@apra.edu.com',
      passwordHash: 'hashed_password_stub',
      firstName: 'Francisco',
      lastName: 'SM',
      isActive: true,
      lastLogin: new Date(),
    }
  });

  // Assign Admin role
  await prisma.userRole.upsert({
    where: {
      userId_roleId: {
        userId: adminUser.id,
        roleId: adminRole.id
      }
    },
    update: {},
    create: {
      userId: adminUser.id,
      roleId: adminRole.id
    }
  });

  console.log('Database seeded with roles and Admin Francisco SM');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
