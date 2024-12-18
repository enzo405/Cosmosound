import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const PORT = process.env.PORT;
const ADDRESS = process.env.HOSTNAME;
const DB_NAME = process.env.DB_NAME;
const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

const app = express();
app.use(express.json());

mongoose
  .connect(`mongodb://${DB_HOST}/${DB_NAME}`, {
    user: DB_USER,
    pass: DB_PASSWORD,
  })
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.log("Database connection error:", err));

app.listen(PORT, () => {
  console.log(`Server running on ${ADDRESS}:${PORT}`);
});
