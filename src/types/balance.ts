
export interface CreateBalanceInput {
    amount: number,
    groupId: string,
    fromMemberId: string,
    toMemberId: string,
}

export interface BalanceRepository {
    find(
        groupId: string,
        fromMemberId: string,
        toMemberId: string
    ): Promise<BalanceSummary | null>

    upsert(input: CreateBalanceInput): Promise<BalanceSummary>

    increment(
        groupId: string,
        fromMemberId: string,
        toMemberId: string,
        amount: number
    ): Promise<BalanceSummary>

    decrement(
        groupId: string,
        fromMemberId: string,
        toMemberId: string,
        amount: number
    ): Promise<BalanceSummary>

    delete(
        groupId: string,
        fromMemberId: string,
        toMemberId: string
    ): Promise<void>

    listByGroup(groupId: string): Promise<BalanceSummary[]>
    // settleUp(groupId:string, )
}

export interface BalanceSummary {
    amount: number,
    fromMemberId: string,
    toMemberId: string,
    groupId: string
}