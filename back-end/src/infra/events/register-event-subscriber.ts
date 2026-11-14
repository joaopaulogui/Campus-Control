import { OnFloorRegistered } from "@/domain/subscribers/on-floor-registered";
import { PrismaAuditsRepository } from "../prisma/repositories/prisma-audits-repository"; 
import { PrismaUsersRepository } from "../prisma/repositories/prisma-users-repository"; 
import { OnBuildingRegistered } from "@/domain/subscribers/on-building-registered";
import { CreateAuditUseCase } from "@domain/use-cases/create-audit-use-case";
import { PrismaBuildingsRepository } from "../prisma/repositories/prisma-buildings-repository";
import { PrismaFloorsRepository } from "../prisma/repositories/prisma-floors-repository";
import { OnRoomRegistered } from "@/domain/subscribers/on-room-registered";
import { OnAirConditionerRegistered } from "@/domain/subscribers/on-air-conditioner-registered";
import { PrismaRoomsRepository } from "../prisma/repositories/prisma-rooms-repository";
import { OnProjectorRegistered } from "@/domain/subscribers/on-projector-registered";
import { OnUserRegistered } from "@/domain/subscribers/on-user-registered";
import { OnItemRegistered } from "@/domain/subscribers/on-item-registered";

export function registerEventSubscribers() {
    const auditsRepository = new PrismaAuditsRepository()
    const usersRepository = new PrismaUsersRepository()
    const buildingsRepository = new PrismaBuildingsRepository()
    const floorsRepository = new PrismaFloorsRepository()
    const roomsRepository = new PrismaRoomsRepository() 

    const createAuditUseCase = new CreateAuditUseCase(auditsRepository)

    new OnBuildingRegistered(usersRepository, createAuditUseCase)
    new OnFloorRegistered(usersRepository, buildingsRepository, createAuditUseCase)
    new OnRoomRegistered(usersRepository, floorsRepository, buildingsRepository, createAuditUseCase)
    new OnAirConditionerRegistered(usersRepository, roomsRepository, createAuditUseCase)
    new OnProjectorRegistered(usersRepository, roomsRepository, createAuditUseCase)
    new OnUserRegistered(usersRepository, createAuditUseCase)
    new OnItemRegistered(usersRepository, createAuditUseCase)
}