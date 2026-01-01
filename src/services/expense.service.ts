import { DuplicateMembersInSplitsArrayError, EmptySplitsArrayError, ExpenseNotFoundError, GroupNotFoundError, InvalidAmountError, InvalidSplitValueError, MemberNotFoundError, MemberNotInGroupError, PercentageSplitNotEqualTo100Error, SplitAmountMismatchError } from "../errors/errors";
import { prisma } from "../prisma";
import type { CreateExpenseInput, ExpenseRepository, ExpenseSummary, UpdateExpenseInput } from "../types/expense";
import type { GroupRepository } from "../types/group";
import type { MemberRepository } from "../types/member";
import type { SplitInput, SplitRepository, SplitType } from "../types/split";

export class ExpenseService {
    constructor(
        private readonly groupRepo: GroupRepository,
        private readonly expenseRepo: ExpenseRepository
        , private readonly memberRepo: MemberRepository,
        private readonly splitRepo: SplitRepository
    ) { }
    async create(input: CreateExpenseInput,): Promise<ExpenseSummary> {
        await this.validateExpense(input)
        let total = 0;
        const map = this.normalizeSplits(input.splitType, total, input.splits);
        return prisma.$transaction(async (tx) => {
            const expense = await this.expenseRepo.create({
                amount: input.amount,
                description: input.description,
                whoPaidId: input.whoPaidId,
                groupId: input.groupId, splitType: input.splitType, splits: input.splits
            }, tx)
            // 2️⃣ Create splits
            await this.splitRepo.createMany(
                expense.id,
                normalizedSplits,
                tx
            );

            // 3️⃣ Update balances
            await this.balanceService.applyExpense(
                expense,
                normalizedSplits,
                tx
            );

            return expense;

        })
    }


    private normalizeSplits(
        type: SplitType,
        total: number,
        splits: SplitInput[]
    ): Map<string, number> {

        const result = new Map<string, number>();
        switch (type) {
            case "EQUAL": {
                const perHead = total / splits.length;
                for (const s of splits) {
                    result.set(s.memberId, perHead);
                }
                break;
            }

            case "AMOUNT": {
                let sum = 0;
                for (const s of splits) {
                    if (s.value == null) throw new InvalidSplitValueError();
                    sum += s.value;
                    result.set(s.memberId, s.value);
                }
                if (sum !== total) throw new SplitAmountMismatchError();
                break;
            }

            case "PERCENTAGE": {
                let percentSum = 0;
                for (const s of splits) {
                    if (s.value == null) throw new InvalidSplitValueError();
                    percentSum += s.value;
                    result.set(s.memberId, (total * s.value) / 100);
                }
                if (percentSum !== 100) throw new PercentageSplitNotEqualTo100Error();
                break;
            }

            case "SHARE": {
                const totalShares = splits.reduce(
                    (acc, s) => acc + (s.value ?? 0),
                    0
                );
                if (totalShares === 0) throw new InvalidSplitValueError();

                for (const s of splits) {
                    if (s.value == null) throw new InvalidSplitValueError();
                    result.set(
                        s.memberId,
                        (total * s.value) / totalShares
                    );
                }
                break;
            }
        }

        return result;
    }

    private async validateExpense(input: CreateExpenseInput): Promise<void> {
        const { amount, whoPaidId, groupId } = input
        if (amount < 0) throw new InvalidAmountError();
        if (input.splits.length === 0) throw new EmptySplitsArrayError()
        const member = await this.memberRepo.findById(whoPaidId);
        if (!member) throw new MemberNotFoundError();
        const group = await this.groupRepo.findById(groupId);
        if (!group) throw new GroupNotFoundError();
        for (const split of input.splits) {
            const isMember = await this.groupRepo.hasMember(groupId, split.memberId);
            if (!isMember) {
                throw new MemberNotInGroupError();
            }
        }
        if (this.hasDuplicates(input.splits)) throw new DuplicateMembersInSplitsArrayError()

    }
    private hasDuplicates<T>(arr: T[]): boolean {
        const map = new Map<T, number>()
        arr.forEach((item) => {
            const count = map.get(item) ?? 0;
            map.set(item, count + 1);
        })
        return Array.from(map.values()).some(count => count > 1);
    }
    async findById(expenseId: string): Promise<ExpenseSummary> {
        const expense = await this.expenseRepo.findById(expenseId);
        if (!expense) throw new ExpenseNotFoundError()
        return expense;
    }
    async listByGroup(groupId: string): Promise<ExpenseSummary[]> {
        const expenses = await this.expenseRepo.listByGroup(groupId);
        return expenses;
    }
    async delete(expenseId: string): Promise<void> {
        await this.findById(expenseId);
        await this.expenseRepo.delete(expenseId);
    }
    async update(expenseId: string, updateInput: UpdateExpenseInput): Promise<ExpenseSummary> {
        await this.findById(expenseId);
        const expense = await this.expenseRepo.update(expenseId, updateInput);
        return expense;
    }

}