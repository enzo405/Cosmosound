import express, { Response, Request } from "express";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import morgan from "morgan";
import authRouter from "./routes/auth.route";
import fileRouter from "./routes/file.route";
import userRouter from "./routes/user.route";
import catalogRouter from "./routes/catalog.route";
import playlistRouter from "./routes/playlist.route";
import genreRouter from "./routes/genre.route";
import cors from "cors";
import cookieParser from "./middlewares/cookie-parser.middleware";
import { errorHandler } from "./errors/errorhandler";

dotenv.config();

const PORT = process.env.PORT;
const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS!.split(","),
  methods: process.env.ALLOWED_METHODS!.split(","),
  allowedHeaders: ["Authorization", "Content-Type", "Cookie"],
  credentials: true,
};

export const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser);
app.use(morgan(":method :url :status :res[content-length] - :response-time ms"));

app.use("/auth", authRouter);
app.use("/", fileRouter);
app.use("/", userRouter);
app.use("/", catalogRouter);
app.use("/", playlistRouter);
app.use("/", genreRouter);
app.get("/health", (req: Request, res: Response) => {
  res.status(200).send("OK");
});

app.use(errorHandler);

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
  console.log(`Server running`);
});

connectDatabase();
