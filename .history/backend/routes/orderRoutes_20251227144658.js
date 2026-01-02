import { authMiddleware } from "../middleware/authMiddleware";
import {ch}
router.post("/checkout", authMiddleware, checkout);