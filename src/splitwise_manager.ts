import { env } from "./env";
import { UserAlreadyExistsError, UserNotFoundError } from "./errors/member.errors";
import type { Member } from "./generated/prisma/client"
import { prisma } from "./prisma";
import jwt from 'jsonwebtoken'

interface MemberRepository {
    create(data: SignupData): Promise<Member>
    findByEmail(email: string): Promise<Member | null>
    findByCredentials(data: SigninData): Promise<Member | null>
}
export class PrismaMemberRepository implements MemberRepository {
    async create(data: SignupData): Promise<Member> {
        const user = await prisma.member.create({
            data
        })
        return user;
    }
    async findByCredentials(data: SigninData): Promise<Member | null> {
        const user = await prisma.member.findUnique({
            where: data
        })
        return user;
    }
    async findByEmail(email: string): Promise<Member | null> {
        const user = await prisma.member.findUnique({
            where: {
                email
            }
        })
        return user;
    }
}
interface SignupData {
    name: string;
    email: string;
    password: string;
}
interface SigninData {
    email: string;
    password: string;
}
export class SplitwiseManager {
    constructor(private members: MemberRepository) { }
    async signup(data: SignupData): Promise<void> {
        const existing = await this.members.findByEmail(data.email);
        if (existing) throw UserAlreadyExistsError;
        await this.members.create(data);

    }
    async signin(data: SigninData): Promise<{ token: string }> {
        const user = await this.members.findByCredentials(data);
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




