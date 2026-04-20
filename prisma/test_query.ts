import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function checkUser() {
  try {
    const user = await prisma.user.findUnique({
      where: { email: 'admin@apra.edu.com' },
      include: {
        roles: {
          include: { role: true }
        }
      }
    });
    console.log(JSON.stringify(user, null, 2));
  } catch (error) {
    console.error("Error querying user:", error);
  } finally {
    await prisma.$disconnect();
  }
}

checkUser();
