import { AppError } from "./app_error";

export const UnauthorizedError = new AppError("UNAUTHORIZED", 400, "User is not authorized");
export const MemberAlreadyExistsError = new AppError('MEMBER_ALREADY_EXISTS', 409, "User already exists!")
export const MemberDoesNotExistsError = new AppError('MEMBER_NOT_FOUND', 404, "User does not exist!");

export const GroupNotFoundError = new AppError('GROUP_NOT_FOUND', 404, "Group does not exists!")
export const MemberAlreadyExistInGroupError = new AppError('MEMBER_ALREADY_EXISTS_IN_GROUP', 409, 'Member already exists in group');