import type { NextFunction, Request, Response } from "express";
import type { AuthService } from "../services/auth.service";
import { catchAsync } from "../utils/catch_async";
import type { ApiResponse } from "../interfaces/api_response";
import type { SigninData, SignupData, TokenInput, TokenSummary } from "../zod";
import jwt from 'jsonwebtoken'
import { env } from "../env";

export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    signup = catchAsync(
        async (req: Request<{}, {}, SignupData>, res: Response<ApiResponse<void>>) => {
            await this.authService.signup(req.body);
            res.status(200).json({
                success: true,
                message: "Signup successful"
            })
        }
    )

    signin = catchAsync(
        async (req: Request<{}, {}, SigninData>, res: Response<ApiResponse<{ token: string }>>) => {
            const token = (await this.authService.signin(req.body)).token;
            res.status(200).json({
                success: true,
                message: "Signin successful",
                data: {
                    token
                }
            })
        }
    )

    verfiyToken = catchAsync(
        async (req: Request<{}, {}, TokenInput>, res: Response<ApiResponse<TokenSummary>>) => {
            const token = req.body as TokenInput
            const verify = await this.authService.verifyToken(token)
            res.status(200).json({
                success: true,
                data: verify
            })
        }
    )
}