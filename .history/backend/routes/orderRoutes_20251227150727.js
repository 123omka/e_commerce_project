import express from ""


import { authMiddleware } from "../middleware/authMiddleware.js";
import { checkout } from "../controllers/orderController.js";
router.post("/checkout", authMiddleware, checkout);

export default router;