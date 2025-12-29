import { z } from "zod";

const minError = (field: string) => `${field} cannot be empty`;
const maxError = (field: string, len: number) =>
    `${field} cannot be more than ${len} characters`;

export const SigninSchema = z.object({
    email: z
        .string({
            error: "Email is required",
            message: "Email must be a string",
        })
        .email("Invalid email format")
        .min(1, minError("Email"))
        .max(200, maxError("Email", 200)),

    password: z
        .string({
            error: "Password is required",
            message: "Password must be a string",
        })
        .min(1, minError("Password"))
        .max(200, maxError("Password", 200)),
});

export const SignupSchema = SigninSchema.extend({
    name: z
        .string({
            error: "Name must be a string",
            message: "Name is required",
        })
        .min(1, minError("Name"))
        .max(100, maxError("Name", 100)),
});
