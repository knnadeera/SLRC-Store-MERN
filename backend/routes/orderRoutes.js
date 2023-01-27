import express from "express";
const router = express.Router();
import { addOrderItems, getOrderById, getUserOrders } from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/").post(protect, addOrderItems);
router.route("/:user").get(protect, getOrderById);
router.route("/").get(protect, getUserOrders);

export default router;
