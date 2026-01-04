import type { CreateMemberInput } from "./member";

export interface SignupData extends CreateMemberInput {
    confirmPassword: string
}
export interface SigninData {
    email: string;
    password: string;
}