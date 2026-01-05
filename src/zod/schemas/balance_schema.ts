import z from 'zod'

export const CreateBalanceInputSchema = z.object({
    amount: z.number(),
    groupId: z.uuid(),
    fromMemberId: z.uuid(),
    toMemberId: z.uuid()
})
export const BalanceSummarySchema = z.object({
    amount: z.number(),
    groupId: z.uuid(),
    fromMemberId: z.uuid(),
    toMemberId: z.uuid()
})

export type CreateBalanceInput = z.infer<typeof CreateBalanceInputSchema>
export type BalanceSummary = z.infer<typeof BalanceSummarySchema>

