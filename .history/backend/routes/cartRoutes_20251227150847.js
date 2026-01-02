import  express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { fetchCart,
        addToCart, 
        updateQuantity,
        removeItem,clearCart     
 } from "../controllers/cartController.js";

 router=express.Router();

router.get("/", authMiddleware, fetchCart);
router.post("/add", authMiddleware, addToCart);
router.put("/update", authMiddleware, updateQuantity);
router.delete("/remove/:id", authMiddleware, removeItem);
router.delete("/clear", authMiddleware, clearCart);
 export default router;
