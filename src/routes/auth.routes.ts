import { Router } from "express";
import { authController } from "../di/container";

export const AuthRouter = Router();

AuthRouter.post("/signup", authController.signup)

AuthRouter.post("/signin", authController.signin)

