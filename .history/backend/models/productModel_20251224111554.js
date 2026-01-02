import db from "../db.js";




export const saveUploadedProducts = async ({
     name,
    description,
    price   ,   
    stock,
    imageUrl
}) => {
  const sql = `
    INSERT INTO products ( name,)
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



