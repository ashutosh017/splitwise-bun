import { AppError } from "./app_error";

export const UserAlreadyExistsError = new AppError('USER_EXISTS', 409, "User already exists!")
export const UserNotFoundError = new AppError('USRE_NOT_FOUND', 404, "User does not exist!");