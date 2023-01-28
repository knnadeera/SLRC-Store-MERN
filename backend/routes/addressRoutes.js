import express from "express";
import { addShippingAddress } from "../controllers/addressController.js";
const router = express.Router();

import { protect } from "../middleware/authMiddleware.js";

router.route("/").post(protect, addShippingAddress);

export default router;
