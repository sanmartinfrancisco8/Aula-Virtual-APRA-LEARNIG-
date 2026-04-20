import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function resetPasswords() {
  const hash = bcrypt.hashSync('password123', 10);
  
  await prisma.user.updateMany({
    data: {
      passwordHash: hash
    }
  });

  console.log('All user passwords reset to: password123');
}

resetPasswords()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
