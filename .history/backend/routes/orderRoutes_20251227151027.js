import express from "express"


import { authMiddleware } from "../middleware/authMiddleware.js";
import { checkout } from "../controllers/orderController.js";
const router=express.Router()
router.post("/checkout", authMiddleware, checkout);

export default router;