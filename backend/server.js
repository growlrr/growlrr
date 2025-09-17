const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());

// Routes
app.get("/v1/health", (req, res) => res.json({ status: "ok" }));
app.use("/v1/auth", require("./routes/auth"));
app.use("/v1/pets", require("./routes/pets"));
app.use("/v1/diets", require("./routes/diets"));
app.use("/v1/orders", require("./routes/orders"));
app.use("/v1/crowdfund", require("./routes/crowdfund"));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend running on :${PORT}`);
});
