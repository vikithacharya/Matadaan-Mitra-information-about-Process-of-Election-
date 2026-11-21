import dotenv from 'dotenv';
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT || 3000);
const isProduction = process.env.NODE_ENV === 'production' && fs.existsSync(path.join(__dirname, 'dist', 'index.html'));

interface ChatRequestBody {
  message?: string;
  history?: Array<{ role: 'user' | 'model'; text: string }>;
  language?: 'en' | 'kn';
  depth?: 'simple' | 'standard' | 'detailed';
  audience?: 'first-time' | 'regular' | 'quick';
}

const CIVIC_SYSTEM_INSTRUCTION = `You are "Matadaan Mitra", a strictly non-partisan Indian & Karnataka election education assistant.
Rules you MUST always follow:
1. STRICT NEUTRALITY: Never endorse, criticize, or predict the winner of any political party or candidate. Treat all parties and voters equally.
2. FICTIONAL SIMULATION REMINDER: If the user asks about candidates in this app's mock booth, clarify they are fictional educational examples.
3. VERIFICATION DISCLAIMER: For any legally specific rule, qualifying date, form number (Form 6, 7, 8, 6A), or current schedule, remind the user to verify on official Election Commission of India portals: eci.gov.in, voters.eci.gov.in, or ceo.karnataka.gov.in (or Helpline 1950).
4. ADAPTIVE TONE:
   - If depth is "simple", explain in plain everyday language with relatable analogies.
   - If depth is "standard", give clear step-by-step civic procedures.
   - If depth is "detailed", cite constitutional articles (e.g., Art. 324, 326) or statutes (Representation of the People Acts 1950/1951, Conduct of Elections Rules 1961) neutrally, and advise checking current notifications on eci.gov.in.
5. LANGUAGE: Respond in Kannada (ಕನ್ನಡ) when language is "kn", and in English when language is "en".
6. BREVITY & CLARITY: Keep answers concise (3-6 sentences or clear bullet points), calm, and helpful.`;

function createGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '1mb' }));

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'matadaan-mitra' });
  });

  app.get('/api/public-config', (_req, res) => {
    const mapsApiKey =
      process.env.VITE_GOOGLE_MAPS_API_KEY ||
      process.env.GOOGLE_MAPS_API_KEY ||
      '';
    res.json({
      mapsApiKey,
      geminiConfigured: Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY'),
    });
  });

  app.post('/api/chat', async (req, res) => {
    const body = (req.body || {}) as ChatRequestBody;
    const message = typeof body.message === 'string' ? body.message.trim() : '';

    if (!message) {
      res.status(400).json({ error: 'Please enter a question to ask Matadaan Mitra.' });
      return;
    }

    if (message.length > 1200) {
      res.status(400).json({ error: 'Message is too long. Please keep questions under 1,200 characters.' });
      return;
    }

    const ai = createGeminiClient();
    if (!ai) {
      res.status(503).json({
        error: 'Gemini API key is not configured on the server. Please configure GEMINI_API_KEY in Settings > Secrets, or use the built-in Offline FAQ mode.',
        code: 'GEMINI_NOT_CONFIGURED',
      });
      return;
    }

    const language = body.language === 'kn' ? 'kn' : 'en';
    const depth = body.depth === 'simple' || body.depth === 'detailed' ? body.depth : 'standard';
    const audience = body.audience === 'first-time' || body.audience === 'regular' ? body.audience : 'quick';

    const historyLines = Array.isArray(body.history)
      ? body.history
          .slice(-6)
          .map((item) => `${item.role === 'user' ? 'User' : 'Mitra'}: ${String(item.text || '').slice(0, 400)}`)
          .join('\n')
      : '';

    const contextualPrompt = [
      `User preferences -> Language: ${language === 'kn' ? 'Kannada' : 'English'}, Depth: ${depth}, Audience: ${audience}.`,
      historyLines ? `Recent conversation:\n${historyLines}` : '',
      `Current question: ${message}`,
    ]
      .filter(Boolean)
      .join('\n\n');

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-4-hydrogen',
        contents: contextualPrompt,
        config: {
          systemInstruction: CIVIC_SYSTEM_INSTRUCTION,
        },
      });

      const reply = response.text?.trim();
      if (!reply) {
        res.status(502).json({ error: 'Received an empty response from Gemini. Please try rephrasing your question.' });
        return;
      }

      res.json({ reply, model: 'gemini-4-hydrogen' });
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to reach Gemini API.';
      const status =
        errorMessage.includes('403') || errorMessage.includes('PERMISSION_DENIED')
          ? 403
          : errorMessage.includes('429') || errorMessage.includes('RESOURCE_EXHAUSTED')
            ? 429
            : errorMessage.includes('400') || errorMessage.includes('API_KEY_INVALID')
              ? 400
              : 500;

      res.status(status).json({
        error: errorMessage,
        code: 'GEMINI_API_ERROR',
      });
    }
  });

  if (isProduction) {
    const distDir = path.join(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('/{*splat}', (_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Matadaan Mitra server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Server startup failed:', err);
  process.exit(1);
});
