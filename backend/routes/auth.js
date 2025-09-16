const express = require("express");
const router = express.Router();

router.post("/signup", (req, res) => {
  res.json({ message: "signup endpoint" });
});

router.post("/login", (req, res) => {
  res.json({ message: "login endpoint" });
});

module.exports = router;

