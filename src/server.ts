import express from 'express';
import { SigninSchema, SignupSchema } from './zod';
import { SplitwiseManager } from './services/splitwiseManger';
import { AppError } from './errors/app_error';
import { PrismaMemberRepository } from './repos/prisma.member.repo';

export const app = express();
app.use(express.json());

const repo = new PrismaMemberRepository();
const manager = new SplitwiseManager(repo)

app.post("api/v1/signup", async (req, res) => {
    const body = await req.body;
    const parsedBody = SignupSchema.safeParse(body);
    if (parsedBody.error) {
        res.status(403).json({
            error: parsedBody.error
        })
        return;
    }
    try {
        const user = await manager.signup(parsedBody.data);
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
        const token = await manager.signin(parsedBody.data);
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
