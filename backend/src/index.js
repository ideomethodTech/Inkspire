import express from "express";
import { db } from "./config/firebase.js";

const app = express();

app.get("/health", async (req, res) => {
  try {
    await db.collection("health").doc("check").set({
      status: "ok",
      time: new Date(),
    });

    res.json({ message: "Firebase connected ✅" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Firebase connection failed ❌" });
  }
});

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server running on port ${process.env.PORT || 4000}`);
});
