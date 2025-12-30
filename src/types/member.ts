import type { SigninData, SignupData } from "./auth";

export interface Member {
    id: string;
    name: string;
    email: string;
    password: string;
}

export interface MemberRepository {
    create(data: SignupData): Promise<Member>
    findByEmail(email: string): Promise<Member | null>
    findByCredentials(data: SigninData): Promise<Member | null>
}
