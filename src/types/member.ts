import type { SigninData, SignupData } from "./auth";

export interface MemberSummary {
    id: string;
    name: string;
    email: string;
}

export interface MemberWithHashedPassword extends MemberSummary {
    password: string;
}

export interface CreateMemberInput {
    name: string;
    email: string;
    password: string;
}

export interface MemberRepository {
    create(data: SignupData): Promise<MemberWithHashedPassword>
    findByEmail(email: string): Promise<MemberWithHashedPassword | null>
    findById(id: string): Promise<MemberSummary | null>
}
