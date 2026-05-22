const express = require("express");
const { revealCountryPack } = require("../controllers/revealController");

const router = express.Router();

router.get("/:token", revealCountryPack);

module.exports = router;
