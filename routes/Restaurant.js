const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../authentication/config");
const { controlMenu, controlDeleteMenu } = require("../controller/controller");

router.post("/createMenuItem",authenticateToken, controlMenu);
router.delete("/deleteMenuItem",authenticateToken, controlDeleteMenu);

module.exports = router;
