import express from "express";
import authController from "../controllers/auth";

const router = express.Router();

router.post("/login", authController.login);
router.post("/register", authController.register);
router.post("/logout", authController.logout);
router.post("/refresh_token", authController.refreshTokens);

export default router;
