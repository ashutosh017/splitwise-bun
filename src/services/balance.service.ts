import { BalanceNotFoundError, GroupNotFoundError, InsufficientBalanceError, InvalidAmountError } from "../errors/errors";
import type { BalanceRepository, BalanceSummary, CreateBalanceInput } from "../types/balance";
import type { GroupRepository } from "../types/group";

export class BalanceService {
    constructor(
        private readonly balanceRepo: BalanceRepository,
        private readonly groupRepo: GroupRepository
    ) {
    }
    async createOrUpdate(input: CreateBalanceInput): Promise<BalanceSummary> {
        if (input.amount < 0) throw new InvalidAmountError();
        const balance = await this.balanceRepo.upsert(input);
        return balance;
    }
    async find(groupId: string, fromMemberId: string, toMemberId: string): Promise<BalanceSummary> {
        const balance = await this.balanceRepo.find(groupId, fromMemberId, toMemberId)
        if (!balance) throw new BalanceNotFoundError()
        return balance;
    }
    async decrement(groupId: string, fromMemberId: string, toMemberId: string, amount: number): Promise<BalanceSummary> {
        if (amount <= 0) throw new InvalidAmountError();
        const balance = await this.find(groupId, fromMemberId, toMemberId);
        if (balance.amount < amount) throw new InsufficientBalanceError();
        return this.balanceRepo.decrement(groupId, fromMemberId, toMemberId, amount);
    }
    async increment(groupId: string, fromMemberId: string, toMemberId: string, amount: number): Promise<BalanceSummary> {
        return this.createOrUpdate({
            groupId, fromMemberId, toMemberId, amount
        });
    }
    async delete(groupId: string, fromMemberId: string, toMemberId: string): Promise<void> {
        await this.find(groupId, fromMemberId, toMemberId);
        await this.balanceRepo.delete(groupId, fromMemberId, toMemberId);
    }
    async listByGroup(groupId: string): Promise<BalanceSummary[]> {
        const group = await this.groupRepo.findById(groupId);
        if (!group) throw new GroupNotFoundError();
        const balances = await this.balanceRepo.listByGroup(groupId);
        return balances;
    }
    async settleUp() {

    }

}