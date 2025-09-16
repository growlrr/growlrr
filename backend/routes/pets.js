const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "pets ok" });
});

module.exports = router;

