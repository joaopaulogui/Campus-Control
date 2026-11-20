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
import { PrismaItemsRepository } from "../prisma/repositories/prisma-items-repository";
import { OnItemLoaned } from "@/domain/subscribers/on-item-loaned";
import { OnItemReturned } from "@/domain/subscribers/on-item-returned";
import { OnUserDeleted } from "@/domain/subscribers/on-user-deleted";
import { OnUserReactivated } from "@/domain/subscribers/on-user-reactivated";
import { OnAirConditionerUpdated } from "@/domain/subscribers/on-air-conditioner-updated";
import { OnAirConditionerDeleted } from "@/domain/subscribers/on-air-conditioner-deleted";
import { OnBuildingUpdated } from "@/domain/subscribers/on-building-updated";
import { OnBuildingDeleted } from "@/domain/subscribers/on-building-deleted";
import { OnFloorUpdated } from "@/domain/subscribers/on-floor-updated";
import { OnFloorDeleted } from "@/domain/subscribers/on-floor-deleted";
import { OnRoomUpdated } from "@/domain/subscribers/on-room-updated";
import { OnRoomDeleted } from "@/domain/subscribers/on-room-deleted";
import { OnProjectorDeleted } from "@/domain/subscribers/on-projector-deleted";
import { OnProjectorUpdated } from "@/domain/subscribers/on-projector-updated";

export function registerEventSubscribers() {
    const auditsRepository = new PrismaAuditsRepository()
    const usersRepository = new PrismaUsersRepository()
    const buildingsRepository = new PrismaBuildingsRepository()
    const floorsRepository = new PrismaFloorsRepository()
    const roomsRepository = new PrismaRoomsRepository() 
    const itemsRepository = new PrismaItemsRepository()

    const createAuditUseCase = new CreateAuditUseCase(auditsRepository)

    
    new OnBuildingRegistered(createAuditUseCase)
    new OnBuildingUpdated(createAuditUseCase)
    new OnBuildingDeleted(createAuditUseCase)

    new OnFloorRegistered(buildingsRepository, createAuditUseCase)
    new OnFloorUpdated(buildingsRepository, createAuditUseCase)
    new OnFloorDeleted(buildingsRepository, createAuditUseCase)

    new OnRoomRegistered(floorsRepository, buildingsRepository, createAuditUseCase)
    new OnRoomUpdated(floorsRepository, buildingsRepository, createAuditUseCase)
    new OnRoomDeleted(floorsRepository, buildingsRepository, createAuditUseCase)

    new OnAirConditionerRegistered(roomsRepository, createAuditUseCase)
    new OnAirConditionerUpdated(roomsRepository, createAuditUseCase)
    new OnAirConditionerDeleted(roomsRepository, createAuditUseCase)

    new OnProjectorRegistered(roomsRepository, createAuditUseCase)
    new OnProjectorUpdated(roomsRepository, createAuditUseCase)
    new OnProjectorDeleted(roomsRepository, createAuditUseCase)

    new OnUserRegistered(usersRepository, createAuditUseCase)
    new OnUserReactivated(usersRepository, createAuditUseCase)
    new OnUserDeleted(usersRepository, createAuditUseCase)

    new OnItemRegistered(createAuditUseCase)
    new OnItemLoaned(itemsRepository, createAuditUseCase)
    new OnItemReturned(itemsRepository, createAuditUseCase)
}