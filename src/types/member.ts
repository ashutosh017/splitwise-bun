import type { SigninData, SignupData } from "./auth";

export interface Member {
    id: string;
    name: string;
    email: string;
}

export interface MemberWithHashedPassword extends Member {
    password: string;
}

export interface MemberRepository {
    create(data: SignupData): Promise<MemberWithHashedPassword>
    findByEmail(email: string): Promise<MemberWithHashedPassword | null>
    findById(id: string): Promise<Member | null>
}
