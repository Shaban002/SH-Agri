import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    {
      name: 'api-server-middleware',
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          if (!req.url) return next();

          if (req.url === '/api/health') {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({
              status: 'ok',
              hasKey: Boolean(process.env.GEMINI_API_KEY || process.env.API_KEY),
            }));
            return;
          }

          if (req.url === '/api/generate-content' && req.method === 'POST') {
            const apiKey = (process.env.GEMINI_API_KEY || process.env.API_KEY || '').trim();
            if (!apiKey) {
              res.statusCode = 503;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'GEMINI_API_KEY is not configured.' }));
              return;
            }

            try {
              const chunks: Buffer[] = [];
              for await (const chunk of req) {
                chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
              }
              const bodyStr = Buffer.concat(chunks).toString('utf-8');
              const bodyObj = JSON.parse(bodyStr || '{}');

              const model = bodyObj.model || 'gemini-3.8-flash';
              const contents = typeof bodyObj.contents === 'string'
                ? [{ parts: [{ text: bodyObj.contents }] }]
                : Array.isArray(bodyObj.contents) ? bodyObj.contents : [bodyObj.contents];

              const upstreamUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
              const upstream = await fetch(upstreamUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  contents,
                  systemInstruction: bodyObj.systemInstruction ? {
                    parts: [{ text: bodyObj.systemInstruction }]
                  } : undefined,
                  generationConfig: bodyObj.config,
                }),
              });

              const data = await upstream.json();
              const text = data?.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text || '').join('') || '';
              res.statusCode = upstream.status;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ ...data, text }));
            } catch (err: unknown) {
              const error = err as Error;
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: error.message || String(error) }));
            }
            return;
          }

          next();
        });
      },
    },
  ],
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
});
