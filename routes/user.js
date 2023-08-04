const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../authentication/config");
const {
  controlUser,
  controlDeleteUser,
  controlMenuItems,
  controlItemsCategory,
  controlItemByName,
  placeOrderById,
  trackOrderId,
} = require("../controller/controller");

router.post("/createUser", controlUser);
router.delete("/deleteUser", authenticateToken, controlDeleteUser);
router.get("/getAllItems", controlMenuItems);
router.get("/getAllItemByCategory", controlItemsCategory);
router.get("/searchItemByName/:item", controlItemByName);
router.post("/placeOrderByUserId",authenticateToken, placeOrderById);
router.get("/getOrderDetails/:orderId",authenticateToken, trackOrderId);
module.exports = router;
