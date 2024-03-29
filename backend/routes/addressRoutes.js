import express from "express";
import {
  addShippingAddress,
  getAddressById,
  getMyAddress,
} from "../controllers/addressController.js";
const router = express.Router();

import { protect } from "../middleware/authMiddleware.js";

router.route("/").post(protect, addShippingAddress);
router.route("/myaddress").get(protect, getMyAddress);
router.route("/:id").get(protect, getAddressById);

export default router;
