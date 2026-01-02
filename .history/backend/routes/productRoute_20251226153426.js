import express from "express";
import {
  addProduct,
  fetchProducts,
  editProduct,
  removeProduct,
} from "../controllers/productController.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

router.post("/add", upload.single("image"), addProduct);
router.get("/", fetchProducts);
router.put("/update/:id", upload.single("image"), editProduct);
router.delete("/delete/:id", removeProduct);

export default router;
