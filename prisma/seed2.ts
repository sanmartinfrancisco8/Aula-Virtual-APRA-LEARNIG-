import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  console.log("Creando datos de prueba (Institución, Programas, Cursos, Usuarios)...");

  // Instución
  const inst = await prisma.institution.upsert({
    where: { slug: 'apra-lms' },
    update: {},
    create: {
      name: 'APRA Learning Systems',
      slug: 'apra-lms'
    }
  });

  // Programa
  const prog = await prisma.program.create({
    data: {
      name: 'Programas de Especialización',
      institutionId: inst.id
    }
  });

  // Cursos
  await prisma.course.createMany({
    data: [
      { title: 'Arquitectura Cloud Enterprise', code: 'CLOUD-101', programId: prog.id, isPublished: true },
      { title: 'Liderazgo y Gestión de Equipos', code: 'LID-200', programId: prog.id, isPublished: true },
      { title: 'Introducción a Machine Learning', code: 'ML-101', programId: prog.id, isPublished: true },
      { title: 'Seguridad Informática Nivel 1', code: 'SEC-101', programId: prog.id, isPublished: true },
      { title: 'Ingeniería DevOps Aplicada', code: 'DEV-301', programId: prog.id, isPublished: true },
      { title: 'Fundamentos de Bases de Datos', code: 'DB-100', programId: prog.id, isPublished: true },
    ]
  });

  // Roles Estudiante y Docente (ya existen por el seed anterior, pero los traemos)
  const studentRole = await prisma.role.findUnique({ where: { name: 'STUDENT' }});
  const teacherRole = await prisma.role.findUnique({ where: { name: 'TEACHER' }});

  if (studentRole) {
    await prisma.user.upsert({
      where: { email: 'carlos.r@student.apra.com' },
      update: {},
      create: {
        email: 'carlos.r@student.apra.com',
        passwordHash: 'dummy',
        firstName: 'Carlos',
        lastName: 'Ruiz',
        isActive: true,
        roles: { create: { roleId: studentRole.id } }
      }
    });
    await prisma.user.upsert({
      where: { email: 'maria.l@student.apra.com' },
      update: {},
      create: {
        email: 'maria.l@student.apra.com',
        passwordHash: 'dummy',
        firstName: 'María',
        lastName: 'López',
        isActive: false,
        roles: { create: { roleId: studentRole.id } }
      }
    });
  }

  if (teacherRole) {
    await prisma.user.upsert({
      where: { email: 'andrea@apra.edu.com' },
      update: {},
      create: {
        email: 'andrea@apra.edu.com',
        passwordHash: 'dummy',
        firstName: 'Andrea',
        lastName: 'Gómez',
        isActive: true,
        lastLogin: new Date(),
        roles: { create: { roleId: teacherRole.id } }
      }
    });
  }

  console.log("Datos creados exitosamente.");
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => await prisma.$disconnect());
