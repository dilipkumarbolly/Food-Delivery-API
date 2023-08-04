const express = require("express");
const { authenticateToken } = require("../authentication/config");
const router = express.Router();
const {
  controldelboy,
  controlAvailability,
  controlDeleteDelBoy,
} = require("../controller/controller");

router.post("/createDeliveryProfile", controldelboy);
router.post("/updateAvailability",authenticateToken, controlAvailability);
router.delete("/deleteDeliveryProfile", authenticateToken, controlDeleteDelBoy);

module.exports = router;
