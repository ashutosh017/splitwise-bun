import type { NextFunction, Request, Response } from "express";
import type { ApiResponse } from "../interfaces/api_response";
import { AppError } from "../errors/app_error";

export const errorHandler = (
    err: any,
    req: Request,
    res: Response<ApiResponse<void>>,
    next: NextFunction
) => {
    if (err instanceof AppError) {
        res.status(err.status).json({
            success: false,
            message: err.message
        })
        return;
    }
    if (err.name === 'ZodError') {
        res.status(400).json({
            success: false,
            message: "Validation failed"
        })
        return;
    }
    res.status(500).json({
        success: false,
        message: "Internal server error",
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    })
    return;
}