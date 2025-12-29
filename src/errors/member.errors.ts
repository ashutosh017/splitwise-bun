import { AppErr } from "./app_error";

export const UserAlreadyExistsError = new AppErr('USER_EXISTS', 409, "User already exists!")
export const UserNotFoundError = new AppErr('USRE_NOT_FOUND', 404, "User does not exist!");