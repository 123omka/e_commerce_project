import { authMiddleware } from "../middleware";
import { fetchCart,
        addToCart, 
        updateQuantity,
        removeItem,clearCart     
 } from "../controllers/cartController";

router.get("/", authMiddleware, fetchCart);
router.post("/add", authMiddleware, addToCart);
router.put("/update", authMiddleware, updateQuantity);
router.delete("/remove/:id", authMiddleware, removeItem);
router.delete("/clear", authMiddleware, clearCart);
