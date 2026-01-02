import { authMiddleware } from "../middleware/authMiddleware";
import { fetchCart
        add      
 } from "../controllers/cartController";

router.get("/", authMiddleware, fetchCart);
router.post("/add", authMiddleware, addToCart);
router.put("/update", authMiddleware, updateQuantity);
router.delete("/remove/:id", authMiddleware, removeItem);
router.delete("/clear", authMiddleware, clearCart);
