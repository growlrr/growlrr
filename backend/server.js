const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());

// health
app.get('/v1/health', (req, res) => res.json({ status: 'ok' }));

// mount pets router (if file exists). If not, provide fallback.
try {
  const petsRouter = require('./routes/pets');
  app.use('/v1/pets', petsRouter);
  console.log('Mounted ./routes/pets at /v1/pets');
} catch (err) {
  console.warn('No ./routes/pets found or error requiring it:', err.message);
  // fallback route so front-end doesn't 404 while you fix routes
  app.get('/v1/pets', (req, res) => res.json({ pets: [] }));
  app.get('/v1/pets/:id', (req, res) => res.status(404).json({ error: 'not found' }));
}

// friendly root
app.get('/', (req, res) => res.send('Growlrr API — use /v1/* routes'));

// listen on Render/localhost port

// Ask Growlrr (chat) router
const askRouter = require('./routes/ask');
app.use('/v1/ask', askRouter);

// Orders router
const ordersRouter = require('./routes/orders');
app.use('/v1/orders', ordersRouter);
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend running on :${PORT}`);
});
