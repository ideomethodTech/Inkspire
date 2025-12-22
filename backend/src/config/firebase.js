import dotenv from "dotenv";
import admin from "firebase-admin";
import fs from "fs";

dotenv.config(); // 🔑 LOAD ENV HERE (CRITICAL)

const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT;

if (!serviceAccountPath) {
  throw new Error("FIREBASE_SERVICE_ACCOUNT not set in env");
}

const serviceAccount = JSON.parse(
  fs.readFileSync(serviceAccountPath, "utf8")
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const db = admin.firestore();
export default admin;
