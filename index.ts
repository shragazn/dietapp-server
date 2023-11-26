import { PrismaClient } from "@prisma/client";
import cors from "cors";
import express, { Request, Response, NextFunction } from "express";
import auth from "./routes/auth";
import jwt from "./middleware/jwt";
import cookieParser from "cookie-parser";
import workout from "./routes/workouts/workout";

export const prisma = new PrismaClient();

const app = express();

const port = Bun.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());

// public routes
app.use("/auth", auth);

// private routes
app.use(jwt());
app.use("/workout", workout);

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
