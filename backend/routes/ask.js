/*
  /v1/ask — call Gemini when GEMINI_API_KEY present and FAKE_LLM != 'true'
  Uses REST endpoint:
    POST https://generativelanguage.googleapis.com/v1beta/models/<model>:generateContent
  Header: x-goog-api-key: <GEMINI_API_KEY>

  If GEMINI_API_KEY is absent or FAKE_LLM === 'true', falls back to fakeLLMAnswer().
*/
const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

const VALID = new Set(['easy','medium','hard']);

function fakeLLMAnswer(question, difficulty) {
  const base = {
    easy: `Short answer: ${question.split('?')[0]}. Keep it simple and actionable.`,
    medium: `Medium answer: ${question.split('?')[0]}. Add one reason and one practical tip.`,
    hard: `Detailed answer: ${question.split('?')[0]}. Provide calculations, references and alternatives.`
  };
  return base[difficulty] || base.easy;
}

function promptByDifficulty(q, difficulty) {
  // Keep prompts succinct — backend will append additional context (pet data) later if available.
  if (difficulty === 'easy') {
    return `Answer in 1-2 sentences for a pet owner (non-technical). Q: ${q}`;
  } else if (difficulty === 'medium') {
    return `Answer concisely with one quick rationale and one practical tip. Q: ${q}`;
  } else {
    // hard
    return `Provide a thorough, referenced answer suitable for a knowledgeable pet-owner or vet.
Give explicit numbers where possible and show brief calculations if applicable. Q: ${q}`;
  }
}

// Helper to call Gemini REST
async function callGeminiRest(prompt, model='gemini-2.5-flash') {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new Error('GEMINI_API_KEY not set');

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;
  const payload = {
    contents: [
      {
        parts: [
          { text: prompt }
        ]
      }
    ]
  };

  // allow optional thinking budget to be set (0 for speed, higher for better output)
  if (process.env.GEMINI_THINKING_BUDGET) {
    payload.generationConfig = {
      thinkingConfig: { thinkingBudget: Number(process.env.GEMINI_THINKING_BUDGET) }
    };
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': key
    },
    body: JSON.stringify(payload),
    // timeout may be controlled by platform; keep default here
  });

  if (!res.ok) {
    const txt = await res.text().catch(() => '');
    throw new Error(`Gemini API error: ${res.status} ${res.statusText} — ${txt}`);
  }

  const data = await res.json();

  // According to docs, the text usually lives at data.candidates[0].content.parts[0].text
  // Newer endpoints may also expose top-level 'candidates' or 'content' keys — be defensive.
  try {
    if (data?.candidates && data.candidates.length > 0) {
      const candidate = data.candidates[0];
      if (candidate?.content?.parts && candidate.content.parts.length > 0) {
        return candidate.content.parts.map(p => p.text || '').join('\n\n').trim();
      }
    }
    // fallback: look for 'content' key top-level or 'output' or 'text'
    if (data?.output?.[0]?.content?.[0]?.parts?.[0]?.text) {
      return data.output[0].content[0].parts[0].text;
    }
    if (data?.text) return String(data.text);
    // as last resort, stringify whole response
    return JSON.stringify(data);
  } catch (err) {
    return JSON.stringify(data);
  }
}

router.post('/', async (req, res) => {
  try {
    const body = req.body || {};
    const question = String(body.question || '').trim();
    const pet_id = body.pet_id || null;
    const difficulty = String(body.difficulty || 'easy').toLowerCase();

    if (!question) return res.status(400).json({ error: 'question is required' });
    if (!VALID.has(difficulty)) return res.status(400).json({ error: 'difficulty must be easy|medium|hard' });

    const id = uuidv4();
    let answer = null;

    const useGemini = !!(process.env.GEMINI_API_KEY) && (process.env.FAKE_LLM !== 'true');

    if (useGemini) {
      const prompt = promptByDifficulty(question, difficulty);
      try {
        answer = await callGeminiRest(prompt, process.env.GEMINI_MODEL || 'gemini-2.5-flash');
      } catch (err) {
        console.warn('Gemini call failed, falling back to fake answer:', err.message || err);
        answer = fakeLLMAnswer(question, difficulty) + `\n\n(Note: Gemini call failed: ${err.message || 'unknown'})`;
      }
    } else {
      answer = fakeLLMAnswer(question, difficulty);
    }

    // Best-effort DB save
    if (process.env.DATABASE_URL) {
      try {
        const { Client } = require('pg');
        const client = new Client({ connectionString: process.env.DATABASE_URL });
        await client.connect();
        const q = `
          INSERT INTO chat_messages(id, pet_id, question, difficulty, answer)
          VALUES($1, $2, $3, $4, $5)
          ON CONFLICT DO NOTHING
        `;
        await client.query(q, [id, pet_id, question, difficulty, answer]);
        await client.end();
      } catch (err) {
        console.warn('DB save failed for /v1/ask:', err.message || err);
      }
    }

    return res.json({
      id,
      question,
      difficulty,
      answer,
      created_at: new Date().toISOString()
    });
  } catch (err) {
    console.error('ask handler error', err);
    return res.status(500).json({ error: 'internal error' });
  }
});

module.exports = router;
