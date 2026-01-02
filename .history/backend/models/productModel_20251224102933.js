import db from "../db.js";



export const getDocumentsByUserId = async (user_id) => {
  const sql = "SELECT * FROM documents WHERE user_id = ?";
  const [rows] = await db.execute(sql, [user_id]);
  return rows.length ? rows[0] : null;
};

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



export const updateDocuments = async ({
  user_id,
  idProof,
  addressProof,
  workPermit,
  issueDate,
  expiryDate,
}) => {
  const sql = `
    UPDATE documents SET
      id_proof = ?, 
      address_proof = ?, 
      work_permit = ?, 
      issue_date = ?, 
      expiry_date = ?
    WHERE user_id = ?
  `;

  await db.execute(sql, [
    idProof,
    addressProof,
    workPermit,
    issueDate,
    expiryDate,
    user_id,
  ]);
};