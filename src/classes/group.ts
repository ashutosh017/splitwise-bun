import { prisma } from "../prisma";
import type { PrismaMemberRepository } from "./splitwise_manager";

export class PrismaGroupRepository{
    constructor(){}
}

export class Group{
    constructor(
        members:PrismaMemberRepository,
        group: PrismaGroupRepository
    ){}
    async create(name:string){
        // await prisma.
    }
}