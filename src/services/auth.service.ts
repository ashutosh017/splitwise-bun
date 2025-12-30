import { env } from "../env";
import jwt from 'jsonwebtoken'
import type { SigninData, SignupData } from "../types/auth";
import type { MemberRepository } from "../types/member";
import { UserAlreadyExistsError, UserNotFoundError } from "../errors/auth.errors";

export class AuthService {
    constructor(private members: MemberRepository) { }
    async signup(data: SignupData): Promise<void> {
        const existing = await this.members.findByEmail(data.email);
        if (existing) throw UserAlreadyExistsError;
        await this.members.create(data);

    }
    async signin(data: SigninData): Promise<{ token: string }> {
        const user = await this.members.findByEmail(data.email);
        if (!user) {
            throw UserNotFoundError;
        }
        const token = jwt.sign({ userId: user.id, email: user.email }, env.JWT_SECRET, {
            expiresIn: '7d'
        })
        return {
            token,
        }
    }
}




