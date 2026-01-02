// // middleware/authMiddleware.js
// import jwt from "jsonwebtoken";
// const JWT_SECRET = process.env.JWT_SECRET ;

// export const authMiddleware = (req, res, next) => {
//   const authHeader = req.headers.authorization || "";
//   const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
//   if (!token) return res.status(401).json({ message: "No token provided" });

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     req.user = decoded; // { id, email, iat, exp }
//     next();
//   } catch (err) {
//     return res.status(403).json({ message: "Invalid or expired token" });
//   }
// };
