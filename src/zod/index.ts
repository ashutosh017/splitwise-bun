import { string, z } from "zod";
import { maxError, minError, stringError } from "./errors";


export const SigninSchema = z.object({
    email: z
        .string({
            error: stringError("Email")
        })
        .min(1, minError("Email"))
        .max(200, maxError("Email", 200)),

    password: z
        .string({
            error: stringError("Password")
        })
        .min(1, minError("Password"))
        .max(200, maxError("Password", 200)),
});

export const SignupSchema = SigninSchema.extend({
    name: z
        .string({
            error: stringError("Name")
        })
        .min(1, minError("Name"))
        .max(100, maxError("Name", 100)),
});

export const CreateGroupSchema = z.object({
    name: z.string({
        error: stringError("Name")
    }).min(1, minError("Name")).max(200, maxError("Name", 200)),
    description: z.string({
        error: stringError("Description")
    }).min(1, minError("Description")).max(300,
        maxError("Description", 200)
    )
})

export const AddOrRemoveMemberSchema = z.object({
    groupId: z.string({
        error: stringError("GroupId")
    }).min(1, minError("GroupId")).max(200, maxError("GroupId", 200)),
    memberId: z.string({
        error: stringError("MemberId")
    }).min(1, minError("MemberId")).max(200, maxError("MemberId", 200))
})

export const Id = z.string({ error: stringError("Id") }).min(1, minError("Id")).max(200, maxError("Id", 200))
