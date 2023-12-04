import fs from 'fs';
import express, { Request, Response, NextFunction } from 'express';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = 5173;

async function createServer(): Promise<void> {
  const app = express();
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom',
  });

  app.use(vite.middlewares);

  app.use('*', async (req: Request, res: Response, next: NextFunction) => {
    const url = req.originalUrl;

    try {
      let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
      template = await vite.transformIndexHtml(url, template);

      const { render } = await vite.ssrLoadModule('./src/entry-server.tsx');
      const appHtml = await render(url);
      const html = template.replace(`<!--ssr-outlet-->`, appHtml);

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (err: unknown) {
      if (err instanceof Error) {
        vite.ssrFixStacktrace(err);
        console.log(err.stack);
        res.status(500).end(err.stack);
      }
      next(err);
    }
  });

  app.listen(PORT, () => console.log(`http://localhost:${PORT}/`));
}

createServer();
