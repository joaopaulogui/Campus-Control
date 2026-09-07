import type { User } from "../../entities/user";
import { prisma } from "../../lib/prisma";
import { PrismaUserMapper } from "../../mappers/prisma-user-mapper";
import type { UsersRepository } from "../users-repositoy";

export class PrismaUsersRepository implements UsersRepository {
    async create(user: User): Promise<void> {
        const data = PrismaUserMapper.toPrisma(user)

        await prisma.user.create({ data, })
    }

    async findById(id: string): Promise<User | null> {
        const user = await prisma.user.findUnique({ where: { id, } })

        if(!user) {
            return null
        }

        return PrismaUserMapper.toDomain(user)
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await prisma.user.findUnique({ where: { email, } })

        if(!user) {
            return null
        }

        return PrismaUserMapper.toDomain(user)
    }

    async delete(user: User): Promise<void> {
        await prisma.user.delete({ 
            where: { id: user.id } 
        })
    }
}