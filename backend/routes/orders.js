const express = require('express');
const router = express.Router();

// POST /v1/orders -> create an order (placeholder)
router.post('/', async (req, res) => {
  try {
    const payload = req.body || {};
    // If DB available, insert into orders (best-effort)
    let id = require('uuid').v4();
    if (process.env.DATABASE_URL) {
      try {
        const { Client } = require('pg');
        const client = new Client({ connectionString: process.env.DATABASE_URL });
        await client.connect();
        await client.query(
          'INSERT INTO orders(id, pet_id, items, total_cents, currency, status) VALUES($1,$2,$3,$4,$5,$6)',
          [id, payload.pet_id || null, payload.items || null, payload.total_cents || null, payload.currency || 'USD', 'pending']
        );
        await client.end();
      } catch (err) {
        console.warn('orders insert failed:', err.message || err);
      }
    }
    return res.json({ id, status: 'created' });
  } catch (err) {
    console.error('orders error', err);
    return res.status(500).json({ error: 'internal error' });
  }
});

module.exports = router;
