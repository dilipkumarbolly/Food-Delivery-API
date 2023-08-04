const express = require("express");
const router = express.Router();
const { createToken } = require("../controller/controller");

router.post("/login", createToken);
module.exports = router;
