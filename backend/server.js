const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// --- Put your API routes here ---
// Example placeholder endpoints (keep your real routes too)
app.get('/v1/health', (req, res) => {
  res.json({ status: 'ok' });
});

// (Optional) if you have other routers, require and use them here:
// const petsRouter = require('./routes/pets');
// app.use('/v1/pets', petsRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend running on :${PORT}`);
});
