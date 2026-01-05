import type { NextFunction, Request, Response } from "express";
import type { AuthService } from "../services/auth.service";
import { catchAsync } from "../utils/catch_async";

export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    signup = catchAsync(
        async (req: Request, res: Response) => {
            await this.authService.signup(req.body);
            res.status(200).json({
                message: "Signup successful"
            })
        }
    )

    signin = catchAsync(
        async (req: Request, res: Response) => {
            const token = await this.authService.signin(req.body);
            res.status(200).json({
                message: "Signin successful",
                token
            })
        }
    )
}