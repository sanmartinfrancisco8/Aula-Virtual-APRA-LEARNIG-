import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function debugLogin() {
  const email = 'admin@apra.edu.com';
  const password = 'password123';
  
  try {
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      console.log("USER NOT FOUND");
      return;
    }
    
    console.log("Password Hash in DB:", user.passwordHash);
    const isMatch = bcrypt.compareSync(password, user.passwordHash);
    console.log("Does 'password123' match?", isMatch);

  } catch (error) {
    console.error("Error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

debugLogin();
