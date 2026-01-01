import { env } from "../env";
import jwt from 'jsonwebtoken'
import type { SigninData, SignupData } from "../types/auth";
import type { MemberRepository } from "../types/member";
import { MemberAlreadyExistsError, MemberNotFoundError } from "../errors/errors";

export class AuthService {
    constructor(private members: MemberRepository) { }
    async signup(data: SignupData): Promise<void> {
        const existing = await this.members.findByEmail(data.email);
        if (existing) throw new MemberAlreadyExistsError();
        await this.members.create(data);
    }
    async signin(data: SigninData): Promise<{ token: string }> {
        const user = await this.members.findByEmail(data.email);
        if (!user) {
            throw new MemberNotFoundError();
        }
        const token = jwt.sign({ userId: user.id, email: user.email }, env.JWT_SECRET, {
            expiresIn: '7d'
        })
        return {
            token,
        }
    }
}




