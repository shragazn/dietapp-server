import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "..";
import { isAuthorized } from "../utils/auth";

const verifyJWT =
  (roles?: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1];
    if (!token) {
      return res.status(401).send("Missing token");
    }

    let payload: string | jwt.JwtPayload | undefined;
    jwt.verify(token, Bun.env.ACCESS_TOKEN_SECRET!, (err, decoded) => {
      if (err) return;
      payload = decoded;
    });

    if (!payload || typeof payload === "string" || !payload.id) {
      return res.status(403).send("Invalid token");
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.id },
    });

    if (!user) return res.status(404).send("User not found");

    if (roles && !isAuthorized(roles, user.roles)) {
      return res.status(403).send("Unauthorized");
    }

    req.user = user;
    next();
  };

export default verifyJWT;
