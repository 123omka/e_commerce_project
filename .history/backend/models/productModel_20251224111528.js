import db from "../db.js";




export const saveUploadedProducts = async ({
     name,
    description,
    price   ,   
    stock,
    imageUrl
}) => {
  const sql = `
    INSERT INTO products ( user_id,id_proof, address_proof, work_permit, issue_date, expiry_date)
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



