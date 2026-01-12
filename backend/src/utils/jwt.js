import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

export const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "7d",
    algorithm: "HS256"           // ← explicitly specify algorithm
  });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET, {
      algorithms: ["HS256"]       // ← enforce only HS256
    });
  } catch (error) {
    throw new Error(`Invalid token: ${error.message}`);
  }
};