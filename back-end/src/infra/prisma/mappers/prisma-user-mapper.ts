import { User, UserRole as DomainUserRole } from "@domain/entities/user";
import { Prisma, type User as PrismaUser, UserRole as PrismaUserRole } from "@generated/prisma/client";

export class PrismaUserMapper {
    static toDomain(raw: PrismaUser, buildingIds: string[] = []): User {
        const mappedRole = DomainUserRole[raw.role as keyof typeof DomainUserRole]

        return new User({
            name: raw.name,
            email: raw.email,
            password: raw.password,
            role: mappedRole,
            buildingIds,
            createdAt: raw.createdAt,
            updatedAt: raw.updatedAt,
            deletedAt: raw.deletedAt
        }, raw.id)
    }

    static toPrisma(user: User): Prisma.UserUncheckedCreateInput { 
        return {
            ...this.baseFields(user),
            buildingEmployees: {
                create: user.buildingIds.map((buildingId) => ({
                    buildingId
                }))
            },
        }
    }

    static toPrismaUpdate(user: User): Prisma.UserUncheckedCreateInput {
        return this.baseFields(user)
    }

    private static baseFields(user: User) {
        const mappedRole = PrismaUserRole[user.role as keyof typeof PrismaUserRole]
        
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
            role: mappedRole,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt ?? null,
            deletedAt: user.deletedAt ?? null
        }
    }
}