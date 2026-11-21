import { GoogleGenAI } from '@google/genai';

interface VercelRequest {
  method?: string;
  body?: {
    message?: string;
    history?: Array<{ role: 'user' | 'model'; text: string }>;
    language?: 'en' | 'kn';
    depth?: 'simple' | 'standard' | 'detailed';
    audience?: 'first-time' | 'regular' | 'quick';
  };
}

interface VercelResponse {
  status: (code: number) => VercelResponse;
  json: (data: unknown) => void;
}

const CIVIC_SYSTEM_INSTRUCTION = `You are "Matadaan Mitra", a strictly non-partisan Indian & Karnataka election education assistant.
Rules:
1. Never endorse, criticize, or predict the winner of any political party or candidate.
2. Remind users that mock booth candidates in this simulator are fictional.
3. For legal rules, schedules, or form rules, advise verifying on eci.gov.in, voters.eci.gov.in, or ceo.karnataka.gov.in (Helpline 1950).
4. Adapt tone to Simple (analogies), Standard (procedures), or Detailed (legal references like RPA 1950/1951, Conduct of Elections Rules 1961).
5. Answer in Kannada when language is "kn", or English when "en". Keep responses concise and clear.`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const body = req.body || {};
  const message = typeof body.message === 'string' ? body.message.trim() : '';

  if (!message) {
    res.status(400).json({ error: 'Please enter a question.' });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    res.status(503).json({
      error: 'GEMINI_API_KEY is not configured in Vercel Environment Variables.',
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
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const response = await ai.models.generateContent({
      model: 'gemini-4-hydrogen',
      contents: contextualPrompt,
      config: {
        systemInstruction: CIVIC_SYSTEM_INSTRUCTION,
      },
    });

    const reply = response.text?.trim();
    if (!reply) {
      res.status(502).json({ error: 'Empty response from Gemini.' });
      return;
    }

    res.status(200).json({ reply, model: 'gemini-4-hydrogen' });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Gemini request failed.';
    res.status(500).json({ error: errorMessage, code: 'GEMINI_API_ERROR' });
  }
}
