import { env } from "../env";
import jwt from 'jsonwebtoken'

import type { MemberService } from "./member.service";
import { PasswordsDoesNotMatchError } from "../errors/errors";
import bcrypt from 'bcrypt'
import type { CreateMemberInput, SigninData, SignupData } from "../zod";

const SALT_ROUNDS = 10;
export class AuthService {
    constructor(private memberService: MemberService) { }
    async signup(data: SignupData): Promise<void> {
        if (data.password !== data.confirmPassword) throw new PasswordsDoesNotMatchError()
        const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS)
        const createInput: CreateMemberInput = {
            name: data.name,
            email: data.email,
            password: hashedPassword
        }
        await this.memberService.create(createInput);
    }

    async signin(data: SigninData): Promise<{ token: string }> {
        const user = await this.memberService.findByEmail(data.email);
        const token = jwt.sign({ userId: user.id, email: user.email }, env.JWT_SECRET, {
            expiresIn: '7d'
        })
        return {
            token,
        }
    }
}




