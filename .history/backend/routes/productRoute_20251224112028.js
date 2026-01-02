import express from "express";
import multer from "multer";
import { uploadProduct } from "../controllers/uploadController.js";

const router = express.Router();

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

// File filter (optional)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPG, JPEG, PNG allowed"), false);
  }
};

const upload = multer({ storage, fileFilter });

router.post(
  "/upload",
  upload.fields([
    { name: "idProof", maxCount: 1 },
    
  ]),
  uploadProduct
);

export default router;
