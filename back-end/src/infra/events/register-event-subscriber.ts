import { PrismaAuditsRepository } from "../prisma/repositories/prisma-audits-repository"; 
import { PrismaUsersRepository } from "../prisma/repositories/prisma-users-repository"; 
import { onBuildingRegistered } from "@domain/subscribers/onBuildingRegistered";
import { CreateAuditUseCase } from "@domain/use-cases/create-audit-use-case";

export function registerEventSubscribers() {
    const auditsRepository = new PrismaAuditsRepository()
    const usersRepository = new PrismaUsersRepository()

    const createAuditUseCase = new CreateAuditUseCase(auditsRepository)

    new onBuildingRegistered(usersRepository, createAuditUseCase)
}