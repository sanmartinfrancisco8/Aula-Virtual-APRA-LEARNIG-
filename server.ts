import { createServer as createViteServer } from 'vite';
import path from 'path';
import express from 'express';
// Import the routes from the isolated API module
import apiApp from './api/index.js';

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

async function startServer() {
  const app = express();

  // 1. Mount the backend API router
  app.use(apiApp);

  // ---------------------------------------------------------------------------
  // VITE MIDDLEWARE (Frontend Delivery for Local Development)
  // ---------------------------------------------------------------------------
  if (process.env.NODE_ENV !== 'production') {
    // Development mode: use Vite's development server as middleware
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production mode: serve static files from dist
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 APRA LMS Backend running on http://localhost:${PORT}`);
  });
}

startServer().catch((e) => {
  console.error("Failed to start server", e);
  process.exit(1);
});
