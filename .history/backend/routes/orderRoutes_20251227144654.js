import { authMiddleware } from "../middleware/authMiddleware";
import
router.post("/checkout", authMiddleware, checkout);