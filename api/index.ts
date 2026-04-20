import express from 'express';
import { prisma } from '../src/lib/prisma.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const app = express();
app.use(express.json());

// ---------------------------------------------------------------------------
// APRA LMS - BACKEND API ROUTES
// ---------------------------------------------------------------------------

// Health Check
app.get('/api/health', async (req, res) => {
  try {
      await prisma.$queryRaw`SELECT 1`;
      res.json({ status: 'ok', version: '1.0.0', database: 'connected' });
  } catch (error) {
      res.status(500).json({ status: 'error', message: 'Database connection failed' });
  }
});

// Users Module
app.get('/api/users', async (req, res) => {
  try {
      const users = await prisma.user.findMany({
        include: {
          roles: { include: { role: true } }
        },
        orderBy: { createdAt: 'desc' }
      });
      res.json(users);
  } catch (error) {
      res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Authentication Endpoint
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  console.log(`[AUTH] Login attempt for email: ${email}`);
  
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        roles: { include: { role: true } }
      }
    });

    if (!user) {
      console.log(`[AUTH] User not found: ${email}`);
      return res.status(401).json({ error: 'Credenciales inválidas.' });
    }
    
    const isMatch = bcrypt.compareSync(password, user.passwordHash);
    
    if (!isMatch) {
       return res.status(401).json({ error: 'Credenciales inválidas.' });
    }

    const roleName = user.roles?.[0]?.role?.name || 'STUDENT';
    const secret = process.env.JWT_SECRET || 'secret-apra-signature-key-x8819';
    
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: roleName },
      secret,
      { expiresIn: '8h' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: roleName
      }
    });
  } catch (e) {
    console.error("[AUTH ERROR]", e);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

// Courses Module
app.get('/api/courses', async (req, res) => {
  try {
      const courses = await prisma.course.findMany({
        orderBy: { createdAt: 'asc' },
        include: {
          _count: { select: { sections: true, modules: true } }
        }
      });
      res.json(courses);
  } catch (error) {
      res.status(500).json({ error: 'Failed to fetch courses' });
  }
});

// Files Module
app.get('/api/folders', async (req, res) => {
  try {
    const folders = await prisma.folder.findMany({
      where: { parentId: null },
      include: { _count: { select: { files: true, children: true } } }
    });
    res.json(folders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch folders' });
  }
});

app.get('/api/files', async (req, res) => {
  try {
    const files = await prisma.file.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10
    });
    res.json(files);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch files' });
  }
});

// Fallback for missing API routes (Prevents HTML from being served for 404 APIs)
app.use('/api', (req, res) => {
  res.status(404).json({ error: "API endpoint not found" });
});

export default app;
