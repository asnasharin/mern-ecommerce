const express = require("express");

const {
  paymentController,
  sendStripeApiKey,
} = require("../controllers/paymentController");

const { protect } = require("../middlewares/authMiddleware");

const route = express.Router();

// protect payment route
route.post("/payment/process", protect, paymentController);

route.get("/stripeapiKey", sendStripeApiKey);

module.exports = route;