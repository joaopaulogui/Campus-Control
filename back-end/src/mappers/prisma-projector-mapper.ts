import { ProjectorStatus as DomainProjectorStatus, Projector } from "../entities/projector";
import { Prisma, type Projector as PrismaProjector, EquipmentStatus as PrismaProjectorStatus } from "../generated/prisma/client";

export class PrismaProjectorMapper {
    static toDomain(raw: PrismaProjector): Projector {
        const mappedStatus = DomainProjectorStatus[raw.status as keyof typeof DomainProjectorStatus]
        
        return new Projector({
            roomId: raw.roomId,
            status: mappedStatus,
            updatedAt: raw.updatedAt
        }, raw.id)
    }

    static toPrisma(projector: Projector): Prisma.ProjectorUncheckedCreateInput {
        const mappedStatus = PrismaProjectorStatus[projector.status as keyof typeof PrismaProjectorStatus]
        
        return {
            id: projector.id,
            roomId: projector.roomId,
            status: mappedStatus,
            updatedAt: projector.updatedAt ?? null
        }
    }
}