import z from "zod";

export const SigninSchema = z.object({
    email: z
        .email({ error: "Invalid email format" }),

    password: z
        .string().min(1).max(100)
});

export const SignupSchema = SigninSchema.extend({
    name: z
        .string().min(1).max(100),
    confirmPassword: z.string().min(1).max(100)

}).superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
        ctx.addIssue({
            code: "custom",
            message: "The passwords did not match",
            path: ["confirmPassword"],
        });
    }
});

export type SignupData = z.infer<typeof SignupSchema>
export type SigninData = z.infer<typeof SigninSchema>