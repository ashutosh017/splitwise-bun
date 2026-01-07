import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../errors/errors";

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new UnauthorizedError();
        }

        const token = authHeader.split(" ")[1];

        if (!token) throw new UnauthorizedError();

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
            id: string,
            email: string
        };

        req.user = decoded

        next();
    } catch (error) {
        next(new UnauthorizedError());
    }
};