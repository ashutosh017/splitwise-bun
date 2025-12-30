import express from 'express';
import { SigninSchema, SignupSchema } from './zod';
import { AuthService } from './services/auth.service';
import { AppError } from './errors/app_error';
import { PrismaMemberRepository } from './repos/prisma.member.repo';
import z from 'zod';

export const app = express();
app.use(express.json());

const repo = new PrismaMemberRepository();
const authService = new AuthService(repo)

app.post("api/v1/signup", async (req, res) => {
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

app.post("/api/v1/signin", async (req, res) => {
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
