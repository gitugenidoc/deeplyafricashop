const express = require("express");
const { ordersPaidWebhook } = require("../controllers/webhookController");

const router = express.Router();

router.post("/orders-paid", ordersPaidWebhook);

module.exports = router;
