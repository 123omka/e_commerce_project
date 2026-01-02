import db from "./db.js";




export const saveUploadedProducts = async ({
     name,
    description,
    price   ,   
    stock,
    imageUrl
}) => {
  const sql = `
    INSERT INTO products ( name,description,price,stock,imageUrl)
    VALUES (?,?, ?, ?, ?)
  `;
  const [result] = await db.execute(sql, [
     name,description,price,stock,imageUrl
  ]);
  return result;
};



