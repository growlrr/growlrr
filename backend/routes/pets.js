const express = require('express');
const router = express.Router();

// placeholder pet list - replace with DB logic later
const samplePets = [
  { id: 1, name: "Bella", species: "dog", kcal_profile: 1200 },
  { id: 2, name: "JLo", species: "cat", kcal_profile: 300 }
];

// GET /v1/pets  -> list pets (placeholder)
router.get('/', (req, res) => {
  res.json({ pets: samplePets });
});

// GET /v1/pets/:id -> single pet (placeholder)
router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const pet = samplePets.find(p => p.id === id);
  if (!pet) return res.status(404).json({ error: 'not found' });
  res.json({ pet });
});

module.exports = router;
