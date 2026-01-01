import { AppError } from "./app_error";

export class UnauthorizedError extends AppError {
    constructor() {
        super("UNAUTHORIZED", 401, "User is not authorized");
    }
}

export class MemberAlreadyExistsError extends AppError {
    constructor() {
        super("MEMBER_ALREADY_EXISTS", 409, "User already exists");
    }
}

export class MemberNotFoundError extends AppError {
    constructor() {
        super("MEMBER_NOT_FOUND", 404, "User does not exist");
    }
}

export class GroupNotFoundError extends AppError {
    constructor() {
        super("GROUP_NOT_FOUND", 404, "Group does not exist");
    }
}

export class MemberAlreadyInGroupError extends AppError {
    constructor() {
        super(
            "MEMBER_ALREADY_IN_GROUP",
            409,
            "Member already exists in group"
        );
    }
}

export class MemberNotInGroupError extends AppError {
    constructor() {
        super(
            "MEMBER_NOT_IN_GROUP",
            404,
            "Member does not exist in group"
        );
    }
}

export class ExpenseNotFoundError extends AppError {
    constructor() {
        super(
            "EXPENSE_NOT_FOUND",
            404,
            "Expense details not found"
        )
    }
}
export class BalanceNotFoundError extends AppError {
    constructor() {
        super(
            "BALANCE_NOT_FOUND",
            404,
            "Balance details not found"
        )
    }
}

export class InvalidAmountError extends AppError {
    constructor() {
        super(
            "INVALID_AMOUNT",
            400,
            "Amount must be greater than zero"
        );
    }
}
export class InsufficientBalanceError extends AppError {
    constructor() {
        super(
            "INSUFFICIENT_BALANCE",
            409,
            "Insufficient balance to perform this operation"
        );
    }
}
