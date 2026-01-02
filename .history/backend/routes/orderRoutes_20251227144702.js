import { authMiddleware } from "../middleware/authMiddleware";
import { checkout } from "../controllers/orderController";
router.post("/checkout", authMiddleware, checkout);