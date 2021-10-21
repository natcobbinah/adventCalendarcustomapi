const express = require("express");
const router = express.Router();
require("dotenv").config();

router.get("/welcome", (req, res) => {
  res.status(200).send("Welcome");
});

module.exports = router;
