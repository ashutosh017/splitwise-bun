import { prisma } from "../prisma";
import type { SigninData, SignupData } from "../types/auth";
import type { Member, MemberRepository, MemberWithHashedPassword } from "../types/member";
import type { Member as PrismaMember } from '../generated/prisma/client'

export class PrismaMemberRepository implements MemberRepository {
    async create(data: SignupData): Promise<MemberWithHashedPassword> {
        const user = await prisma.member.create({
            data
        })
        return this.toDomain(user);
    }
    async findByEmail(email: string): Promise<MemberWithHashedPassword | null> {
        const user = await prisma.member.findUnique({
            where: {
                email
            }
        })
        return user ? this.toDomain(user) : null
    }
    async findById(id: string): Promise<Member | null> {
        const user = await prisma.member.findUnique({
            where: {
                id
            }
        })
        if (!user) {
            return null;
        }
        return this.toDomain(user)
    }
    private toDomain(member: PrismaMember): MemberWithHashedPassword {
        return {
            id: member.id,
            name: member.name,
            password: member.password,
            email: member.email
        }
    }
}