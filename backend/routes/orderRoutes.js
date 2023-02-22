import express from "express";
const router = express.Router();
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  getOrders,
  updateOrderStatus,
  updateOrderToPaid,
  userReceivedOrder,
} from "../controllers/orderController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);
router.route("/myorders").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/received").put(protect, userReceivedOrder);
router.route("/:id/update").put(protect, admin, updateOrderStatus);
router.route("/:id/pay").put(protect, updateOrderToPaid);
export default router;
