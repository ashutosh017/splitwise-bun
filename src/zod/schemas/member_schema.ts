import z from "zod";

export const MemberSchema = z.object({
    id: z.uuid(),
    name: z.string().min(1).max(100),
    email: z.email(),
})

export const MemberWithHashedPasswordSchema = MemberSchema.extend({
    password: z.string().min(4).max(100)
})

export const CreateMemberInputSchema = MemberWithHashedPasswordSchema.omit({
    id: true
})

export type Member = z.infer<typeof MemberSchema>
export type MemberWithHashedPassword = z.infer<typeof MemberWithHashedPasswordSchema>
export type CreateMemberInput = z.infer<typeof CreateMemberInputSchema>


