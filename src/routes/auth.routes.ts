import { Router } from "express";
import { SigninSchema, SignupSchema } from "../zod/";
import z from "zod";
import { AppError } from "../errors/app_error";
import { authService } from "../di/container";

export const AuthRouter = Router();

AuthRouter.post("/signup", async (req, res) => {
    const parsedBody = SignupSchema.safeParse(req.body);
    if (parsedBody.error) {
        res.status(400).json({
            error: z.treeifyError(parsedBody.error)
        })
        return;
    }
    try {
        const user = await authService.signup(parsedBody.data);
        res.status(200).json(user)
    } catch (error) {
        if (error instanceof AppError) {
            res.status(error.status).json({ message: error.message });
            return;
        }
        res.status(500).json({
            message: "Internal server error"
        })

    }
})

AuthRouter.post("/signin", async (req, res) => {
    const body = req.body;
    const parsedBody = SigninSchema.safeParse(body)
    if (parsedBody.error) {
        res.status(403).json({
            message: parsedBody.error
        })
        return;
    }
    try {
        const token = await authService.signin(parsedBody.data);
        res.status(200).json({
            message: "signin successful",
            token
        })

    } catch (error) {
        if (error instanceof AppError) {
            res.status(error.status).json({
                message: error.message
            })
            return;
        }
        res.status(500).json({
            message: "Internal server error"
        })

    }

})

