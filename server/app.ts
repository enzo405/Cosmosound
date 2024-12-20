import express from "express";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;
const ADDRESS = process.env.HOSTNAME || "localhost";

// Initialize Prisma Client
const prisma = new PrismaClient();

const app = express();
app.use(express.json());

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
  console.log(`Server running on ${ADDRESS}:${PORT}`);
});

connectDatabase();
