import { PrismaBalanceRepository } from "../repos/prisma.balance.repo";
import { PrismaExpenseRepository } from "../repos/prisma.expense.repo";
import { PrismaGroupRepository } from "../repos/prisma.group.repo";
import { PrismaMemberRepository } from "../repos/prisma.member.repo";
import { AuthService } from "../services/auth.service";
import { BalanceService } from "../services/balance.service";
import { ExpenseService } from "../services/expense.service";
import { GroupService } from "../services/group.service";

// repos
const memberRepo = new PrismaMemberRepository();
const groupRepo = new PrismaGroupRepository();
const expenseRepo = new PrismaExpenseRepository();
const balanceRepo = new PrismaBalanceRepository();

// services
export const authService = new AuthService(memberRepo);
export const groupService = new GroupService(memberRepo, groupRepo);
export const expenseService = new ExpenseService(
    groupRepo,
    expenseRepo,
    memberRepo
);
export const balanceService = new BalanceService(balanceRepo, groupRepo);
