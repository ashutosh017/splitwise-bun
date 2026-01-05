import type { NextFunction, Request, Response } from "express";
import type { AnyZodObject } from "zod/v3";

export const validate = (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
    const parsedBody = schema.safeParse(req.body)
    if (parsedBody.error) {
        res.status(400).json({
            message: "Zod validation failed"
        })
    }
    next();
}