import type { User } from "@domain/entities/user";
import { prisma } from "../lib/prisma";
import { PrismaUserMapper } from "../mappers/prisma-user-mapper";
import type { UserFilters, UsersRepository } from "@domain/repositories/users-repositoy";
import { DomainEvents } from "@/core/events/domain-events";
import type { UserWhereInput } from "@/generated/prisma/models";

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

    async findMany(filters?: UserFilters): Promise<User[]> {
        const where: UserWhereInput = {}
        
        if(filters?.name) {
            where.name = {
                contains: filters.name,
                mode: "insensitive",
            }
        }
        
        if(filters?.email) {
            where.email = {
                contains: filters.email,
                mode: "insensitive",
            }
        }

        if(filters?.role) {
            where.role = filters.role
        }

        const users = await prisma.user.findMany({
            where,
            orderBy: {
                name: "asc"
            }
        })

        return users.map(user => PrismaUserMapper.toDomain(user))
    }

    async save(user: User): Promise<void> {
        const data = PrismaUserMapper.toPrismaUpdate(user)

        const currentlyWorksOn = await prisma.buildingEmployee.findMany({
            where: { userId: user.id },
            select: { buildingId: true },
        })

        const currentIds = currentlyWorksOn.map((building) => building.buildingId)

        const toAdd = user.buildingIds.filter((id) => !currentIds.includes(id))
        const toRemove = currentIds.filter((id) => !user.buildingIds.includes(id))

        await prisma.$transaction([
            prisma.user.update({ 
                where: { id: user.id },
                data
            }),
            prisma.buildingEmployee.createMany({
                data: toAdd.map((buildingId) => ({ userId: user.id, buildingId }))
            }),
            prisma.buildingEmployee.deleteMany({
                where: { userId: user.id, buildingId: { in: toRemove } }
            })
        ])

        DomainEvents.dispatchEventsForAggregate(user.id)
    }

    async delete(user: User): Promise<void> {
        await prisma.user.delete({ 
            where: { id: user.id } 
        })

        DomainEvents.dispatchEventsForAggregate(user.id)
    }
}