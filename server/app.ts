import express from "express";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import morgan from "morgan";
import authRouter from "./routes/auth.route";

dotenv.config();

const PORT = process.env.PORT || 4000;

const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.use(morgan(":method :url :status :res[content-length] - :response-time ms"));
app.use("/auth", authRouter);

async function connectDatabase() {
  try {
    await prisma.$connect();
    console.log("Connected to the database");
  } catch (err) {
    console.error("Database connection error:", err);
    process.exit(1);
  }
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

connectDatabase();
