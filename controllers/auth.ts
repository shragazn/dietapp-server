import { Request, Response } from "express";
import { prisma } from "..";
import jwt from "jsonwebtoken";

const ACCESS_TOKEN_EXPIRE = "15m";
const REFRESH_TOKEN_EXPIRE = "7d";
const JWT_COOKIE_NAME = "refreshToken";
const MAX_AGE = 1000 * 60 * 60 * 24 * 7; // 7 days

const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send("Missing username or password");
  }

  const foundUser = await prisma.user.findUnique({ where: { email } });
  if (foundUser) {
    return res.status(400).send("User already exists");
  }

  const hashedPassword = await Bun.password.hash(password);
  let newUser;
  try {
    newUser = await prisma.user.create({
      data: { email, password: hashedPassword },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error creating user");
  }

  // Generate tokens
  const accessToken = jwt.sign(
    { id: newUser.id },
    Bun.env.ACCESS_TOKEN_SECRET!,
    { expiresIn: ACCESS_TOKEN_EXPIRE }
  );
  const refreshToken = jwt.sign(
    { id: newUser.id },
    Bun.env.REFRESH_TOKEN_SECRET!,
    { expiresIn: REFRESH_TOKEN_EXPIRE }
  );

  return res
    .cookie(JWT_COOKIE_NAME, refreshToken, {
      httpOnly: true,
      maxAge: MAX_AGE,
    })
    .send({ ...newUser, password: undefined, accessToken });
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send("Missing username or password");
  }

  let foundUser;
  try {
    foundUser = await prisma.user.findUnique({ where: { email } });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error finding user");
  }

  if (!foundUser) {
    return res.status(400).send("User does not exist");
  }
  const validPassword = Bun.password.verifySync(password, foundUser.password);
  if (!validPassword) {
    return res.status(400).send("Wrong password");
  }

  // Generate tokens
  const accessToken = jwt.sign(
    { id: foundUser.id },
    Bun.env.ACCESS_TOKEN_SECRET!,
    { expiresIn: ACCESS_TOKEN_EXPIRE }
  );
  const refreshToken = jwt.sign(
    { id: foundUser.id },
    Bun.env.REFRESH_TOKEN_SECRET!,
    { expiresIn: REFRESH_TOKEN_EXPIRE }
  );

  return res
    .cookie(JWT_COOKIE_NAME, refreshToken, {
      httpOnly: true,
      maxAge: MAX_AGE,
    })
    .send({ ...foundUser, password: undefined, accessToken });
};

const logout = async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) {
    return res.status(401).send("No refresh token provided");
  }
  return res.clearCookie(JWT_COOKIE_NAME).send("Logged out");
};

const refreshTokens = async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) {
    return res.status(401).send("No refresh token provided");
  }

  const payload = jwt.verify(refreshToken, Bun.env.REFRESH_TOKEN_SECRET!);

  if (!payload || typeof payload === "string" || !payload.id) {
    return res.status(403).send("Invalid token");
  }

  // Generate tokens
  const accessToken = jwt.sign(
    { id: payload.id },
    Bun.env.ACCESS_TOKEN_SECRET!,
    { expiresIn: ACCESS_TOKEN_EXPIRE }
  );
  const newRefreshToken = jwt.sign(
    { id: payload.id },
    Bun.env.REFRESH_TOKEN_SECRET!,
    { expiresIn: REFRESH_TOKEN_EXPIRE }
  );

  return res
    .cookie(JWT_COOKIE_NAME, newRefreshToken, {
      httpOnly: true,
      maxAge: MAX_AGE,
    })
    .send({ accessToken });
};

export default { register, login, logout, refreshTokens };
