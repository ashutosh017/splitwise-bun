import { ExpenseNotFoundError } from "../errors/errors";
import type { CreateExpenseInput, ExpenseRepository, ExpenseSummary, UpdateExpenseInput } from "../types/expense";
import type { GroupRepository } from "../types/group";

export class ExpenseService {
    constructor(
        private readonly groupRepo: GroupRepository,
        private readonly expenseRepo: ExpenseRepository
    ) { }
    async create(input: CreateExpenseInput): Promise<ExpenseSummary> {
        const expense = await this.expenseRepo.create(input);
        return expense;
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