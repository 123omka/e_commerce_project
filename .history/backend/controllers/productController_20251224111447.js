import fs from "fs";
import path from "path";
import {
 
  saveUploadedProducts
} from "../models/uploadModel.js";

export const uploadProduct = async (req, res) => {
  try {
    const { } = req.body;

    const idProof = req.files["idProof"]?.[0]?.filename || null;


    if (!imgUrl) {
      return res
        .status(400)
        .json({ success: false, message: "ID and Address Proof required" });
    }

    // 🔥 IF NO RECORD — SAVE NEW DOCUMENTS
    await saveUploadedProducts({
        name,
    description
    price      
    stock
    image
    });

    return res.json({
      success: true,
      message: "Documents uploaded successfully",
    });
  } catch (err) {
    console.error("Upload Error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Server error" });
  }
};
