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
