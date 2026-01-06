import { AuthController } from "../controllers/auth.controller";
import { BalanceController } from "../controllers/balance.controller";
import { ExpenseController } from "../controllers/expense.controller";
import { GroupController } from "../controllers/group.controller";
import { MemberController } from "../controllers/member.controller";
import { SplitController } from "../controllers/split.controller";
import { PrismaBalanceRepository } from "../repos/prisma.balance.repo";
import { PrismaExpenseRepository } from "../repos/prisma.expense.repo";
import { PrismaGroupRepository } from "../repos/prisma.group.repo";
import { PrismaMemberRepository } from "../repos/prisma.member.repo";
import { PrismaSplitRepository } from "../repos/prisma.split.repo";
import { AuthService } from "../services/auth.service";
import { BalanceService } from "../services/balance.service";
import { ExpenseService } from "../services/expense.service";
import { GroupService } from "../services/group.service";
import { MemberService } from "../services/member.service";
import { SplitService } from "../services/split.service";

// Repos
const memberRepo = new PrismaMemberRepository();
const groupRepo = new PrismaGroupRepository();
const expenseRepo = new PrismaExpenseRepository();
const balanceRepo = new PrismaBalanceRepository();
const splitRepo = new PrismaSplitRepository();

// Leaf services
export const memberService = new MemberService(memberRepo);
export const splitService = new SplitService(splitRepo);

// Root services
export const authService = new AuthService(memberService);
export const groupService = new GroupService(groupRepo, memberService);
export const balanceService = new BalanceService(balanceRepo, groupService);
export const expenseService = new ExpenseService(expenseRepo, splitService, groupService, balanceService)

// Controllers
export const authController = new AuthController(authService)
export const balanceController = new BalanceController(balanceService)
export const expenseController = new ExpenseController(expenseService)
export const groupController = new GroupController(groupService)
export const memberController = new MemberController(memberService)
export const splitController = new SplitController(splitService)
