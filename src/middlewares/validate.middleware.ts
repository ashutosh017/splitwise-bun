import type { NextFunction, Request, Response } from "express";
import type { ZodObject } from "zod";

interface ValidationSchema {
    params?: ZodObject,
    body?: ZodObject,
    query?: ZodObject
}

export const validate = (schema: ValidationSchema) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (schema.params) {
            req.params = await schema.params.parseAsync(req.params) as Record<string, string>
        }
        if (schema.body) {
            req.body = await schema.body.parseAsync(req.body)
        }
        if (schema.query) {
            req.query = await schema.query.parseAsync(req.query) as Record<string, string>
        }
        next();
    } catch (error) {
        next(error);
    }
}