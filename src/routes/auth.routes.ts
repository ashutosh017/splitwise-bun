import { Router } from "express";
import { authController } from "../di/container";
import { validate } from "../middlewares/validate.middleware";
import { SigninSchema, SignupSchema, TokenSummarySchema } from "../zod";

export const AuthRouter = Router();

AuthRouter.post("/signup", validate({
    body: SignupSchema
}), authController.signup)

AuthRouter.post("/signin", validate({
    body: SigninSchema
}), authController.signin)

AuthRouter.post('/verify-token', validate({
    body: TokenSummarySchema
}), authController.verfiyToken)

