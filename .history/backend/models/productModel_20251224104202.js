import db from "../db.js";




export const saveUploadedDocuments = async ({
   user_id,
  idProof,
  addressProof,
  workPermit,
  issueDate,
  expiryDate,
}) => {
  const sql = `
    INSERT INTO documents ( user_id,id_proof, address_proof, work_permit, issue_date, expiry_date)
    VALUES (?,?, ?, ?, ?, ?)
  `;
  const [result] = await db.execute(sql, [
     user_id,
    idProof,
    addressProof,
    workPermit,
    issueDate,
    expiryDate,
  ]);
  return result;
};



