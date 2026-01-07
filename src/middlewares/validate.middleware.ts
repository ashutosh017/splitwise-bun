import type { NextFunction, Request, Response } from "express";
import type { ZodObject } from "zod";

export const validate = (schema: ZodObject) => async (req: Request, res: Response, next: NextFunction) => {
    const parsedBody = schema.safeParse(req.body)
    if (parsedBody.error) {
        res.status(400).json({
            message: "Zod validation failed"
        })
        return;
    }
    next();
}