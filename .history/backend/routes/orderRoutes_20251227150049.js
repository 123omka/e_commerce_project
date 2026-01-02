import { authMiddleware } from "../middleware/authMiddleware.js";
import { checkout } from "../controllers/orderController";
router.post("/checkout", authMiddleware, checkout);