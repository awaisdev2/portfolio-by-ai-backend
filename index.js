import dotenv from 'dotenv'
dotenv.config();

import express from "express";
import cors from "cors";
import askAiRoute from "./routes/askAi.route.js";
const app = express();

app.use(cors());
app.use(express.json());
app.use("/v1", askAiRoute);

app.get("/", (req, res) => {
  res.send("Hello, Welcom to my portfolio by AI!");
});

app.listen(process.env.PORT || 8081, () => {
  console.log(`Server is running on port ${process.env.PORT || 8081}`);
});
