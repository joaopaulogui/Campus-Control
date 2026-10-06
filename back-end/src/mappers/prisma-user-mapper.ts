import { User, UserRole as DomainUserRole } from "../entities/user";
import { Prisma, type User as PrismaUser, UserRole as PrismaUserRole } from "../generated/prisma/client";

export class PrismaUserMapper {
    static toDomain(raw: PrismaUser): User {
        const mappedRole = DomainUserRole[raw.role as keyof typeof DomainUserRole]

        return new User({
            name: raw.name,
            email: raw.email,
            password: raw.password,
            role: mappedRole,
            createdAt: raw.createdAt,
            updatedAt: raw.updatedAt,
        }, raw.id)
    }

    static toPrisma(user: User): Prisma.UserUncheckedCreateInput {
        const mappedRole = PrismaUserRole[user.role as keyof typeof PrismaUserRole]
        
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
            role: mappedRole,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt ?? null
        }
    }
}