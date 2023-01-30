import express from "express";
import {
  getAddressById,
} from "../controllers/addressController.js";
const router = express.Router();

import { protect } from "../middleware/authMiddleware.js";

router.route("/:id").get(protect, getAddressById);

export default router;