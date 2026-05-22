const express = require("express");

const router = express.Router();

router.get("/", (request, response) => {
  response.json({ ok: true, service: "deeply-africa-shop-api" });
});

module.exports = router;
