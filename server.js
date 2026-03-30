import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import subscribeRoute from "./api/subscribe.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(
  cors({
    origin: true,
  })
);

app.use(express.json());

app.post("/api/subscribe", subscribeRoute);

console.log("AIRTABLE_TOKEN exists:", !!process.env.AIRTABLE_TOKEN);
console.log("AIRTABLE_BASE_ID:", process.env.AIRTABLE_BASE_ID);
console.log("AIRTABLE_TABLE_NAME:", process.env.AIRTABLE_TABLE_NAME);

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});