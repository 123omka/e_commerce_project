import fs from "fs";
import path from "path";
import {
 
  saveUploadedDocuments,
} from "../models/uploadModel.js";

export const uploadDocuments = async (req, res) => {
  try {
    const { user_id, issueDate, expiryDate } = req.body;

    const idProof = req.files["idProof"]?.[0]?.filename || null;
    const addressProof = req.files["addressProof"]?.[0]?.filename || null;
    const workPermit = req.files["workPermit"]?.[0]?.filename || null;

    if (!idProof || !addressProof) {
      return res
        .status(400)
        .json({ success: false, message: "ID and Address Proof required" });
    }

    // 🔥 CHECK IF USER ALREADY HAS DOCUMENTS
    const existing = await getDocumentsByUserId(user_id);

    if (existing) {
      const folder = path.join(process.cwd(), "uploads");

      const deleteFile = (file) => {
        if (!file) return;
        const filePath = path.join(folder, file);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      };

      deleteFile(existing.id_proof);
      deleteFile(existing.address_proof);
      deleteFile(existing.work_permit);

      await updateDocuments({
        user_id,
        idProof,
        addressProof,
        workPermit,
        issueDate,
        expiryDate,
      });

      return res.json({
        success: true,
        message: "Old documents replaced successfully",
      });
    }

    // 🔥 IF NO RECORD — SAVE NEW DOCUMENTS
    await saveUploadedDocuments({
      user_id,
      idProof,
      addressProof,
      workPermit,
      issueDate,
      expiryDate,
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
