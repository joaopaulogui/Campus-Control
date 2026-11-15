import type { User } from "@domain/entities/user";
import { prisma } from "../lib/prisma";
import { PrismaUserMapper } from "../mappers/prisma-user-mapper";
import type { UsersRepository } from "@domain/repositories/users-repositoy";
import { DomainEvents } from "@/core/events/domain-events";

export class PrismaUsersRepository implements UsersRepository {
    async create(user: User): Promise<void> {
        const data = PrismaUserMapper.toPrisma(user)

        await prisma.user.create({ data, })

        DomainEvents.dispatchEventsForAggregate(user.id)
    }

    async findById(id: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: { id, },
            include: {
                buildingEmployees: {
                    select: {
                        buildingId: true
                    }
                }
            }
        })

        if(!user) {
            return null
        }

        return PrismaUserMapper.toDomain(
            user, 
            user.buildingEmployees.map((be) => be.buildingId)
        )
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

        DomainEvents.dispatchEventsForAggregate(user.id)
    }
}