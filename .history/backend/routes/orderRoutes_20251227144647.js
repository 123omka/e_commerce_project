import { authMiddleware } from "../middleware/authMiddleware";

router.post("/checkout", authMiddleware, checkout);