import express from "express"


import { authMiddleware } from "../middleware/authMiddleware.js";
import { checkout } from "../controllers/orderController.js";
router=expre
router.post("/checkout", authMiddleware, checkout);

export default router;