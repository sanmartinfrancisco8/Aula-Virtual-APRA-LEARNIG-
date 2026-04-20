import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  console.log("Creando datos de prueba (Directorios y Archivos)...");

  // Fetch admin to be the uploader
  const adminRole = await prisma.role.findUnique({ where: { name: 'SUPER_ADMIN' } });
  let adminUserId = null;
  
  if (adminRole) {
    const adminUserRole = await prisma.userRole.findFirst({
        where: { roleId: adminRole.id }
    });
    adminUserId = adminUserRole?.userId;
  }

  if (!adminUserId) {
     console.log("No se pudo encontrar al administrador. Omitiendo seed3.");
     return;
  }

  // Creando carpetas raíz
  const f1 = await prisma.folder.create({ data: { name: 'Materiales de Clase' } });
  const f2 = await prisma.folder.create({ data: { name: 'Documentos Legales' } });
  const f3 = await prisma.folder.create({ data: { name: 'Exámenes y Pruebas' } });
  const f4 = await prisma.folder.create({ data: { name: 'Recursos Multimedia' } });

  // Archivos de prueba
  await prisma.file.createMany({
    data: [
      {
        folderId: f1.id,
        uploaderId: adminUserId,
        name: 'Syllabus_Machine_Learning_2026.pdf',
        originalName: 'Syllabus_Machine_Learning_2026.pdf',
        mimeType: 'application/pdf',
        sizeBytes: 2400000,
        storageKey: 's3://bucket/files/Syllabus_Machine_Learning_2026.pdf',
        status: 'READY'
      },
      {
        folderId: f2.id,
        uploaderId: adminUserId,
        name: 'Reglamento_Institucional.pdf',
        originalName: 'Reglamento_Institucional.pdf',
        mimeType: 'application/pdf',
        sizeBytes: 1100000,
        storageKey: 's3://bucket/files/Reglamento_Institucional.pdf',
        status: 'READY'
      },
      {
        folderId: f1.id,
        uploaderId: adminUserId,
        name: 'Presentacion_Proyecto_Final.pptx',
        originalName: 'Presentacion_Proyecto_Final.pptx',
        mimeType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        sizeBytes: 15400000,
        storageKey: 's3://bucket/files/Presentacion_Proyecto_Final.pptx',
        status: 'READY'
      }
    ]
  });

  console.log("Archivos agregados a la DB exitosamente.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
