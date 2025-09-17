/*
  POST /v1/ask
  Body:
  {
    "pet_id": 1,                // optional
    "question": "How much food?",
    "difficulty": "easy"        // easy|medium|hard
  }
  Response:
  {
    "id": "uuid",
    "question": "...",
    "difficulty": "...",
    "answer": "...",
    "created_at": "..."
  }

  This endpoint uses FAKE_LLM when process.env.FAKE_LLM == "true" (default).
  If DATABASE_URL is present and pg is installed/configured, it will attempt to insert a record into chat_messages
  (safe no-op if DB isn't reachable).
*/
const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

const VALID = new Set(['easy','medium','hard']);

function fakeLLMAnswer(question, difficulty) {
  // simple deterministic-ish fake responder
  const base = {
    easy: `Short answer: ${question.split('?')[0]}. Keep it simple and actionable.`,
    medium: `Medium answer: ${question.split('?')[0]}. Add one reason and one practical tip.`,
    hard: `Detailed answer: ${question.split('?')[0]}. Provide calculations, references and alternatives.`
  };
  return base[difficulty] || base.easy;
}

// Basic validation + handler
router.post('/', async (req, res) => {
  try {
    const body = req.body || {};
    const question = String(body.question || '').trim();
    const pet_id = body.pet_id || null;
    const difficulty = String(body.difficulty || 'easy').toLowerCase();

    if (!question) return res.status(400).json({ error: 'question is required' });
    if (!VALID.has(difficulty)) return res.status(400).json({ error: 'difficulty must be easy|medium|hard' });

    // create record
    const id = uuidv4();
    // generate answer (use LLM provider when configured)
    let answer = null;
    if (process.env.FAKE_LLM === 'false' && process.env.LLM_PROVIDER_API_KEY) {
      // placeholder: call your real LLM provider here
      // e.g., fetch(...) with proper prompt templates
      // For now, fall back to fake to avoid failing without keys
      answer = fakeLLMAnswer(question, difficulty);
    } else {
      answer = fakeLLMAnswer(question, difficulty);
    }

    // try saving to DB if pg present and DATABASE_URL defined
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
        // don't fail the request if DB is not available — log and proceed
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
