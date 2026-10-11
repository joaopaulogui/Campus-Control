import { PrismaAuditsRepository } from "../repositories/prisma/prisma-audits-repository";
import { PrismaUsersRepository } from "../repositories/prisma/prisma-users-repository";
import { onBuildingRegistered } from "../subscribers/onBuildingRegistered";
import { CreateAuditUseCase } from "../use-cases/create-audit-use-case";

export function registerEventSubscribers() {
    const auditsRepository = new PrismaAuditsRepository()
    const usersRepository = new PrismaUsersRepository()

    const createAuditUseCase = new CreateAuditUseCase(auditsRepository)

    new onBuildingRegistered(usersRepository, createAuditUseCase)
}