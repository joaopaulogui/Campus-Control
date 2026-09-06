import { Floor } from "../entities/floor";
import { Prisma, type Floor as PrismaFloor } from '../generated/prisma/client'

export class PrismaFloorMapper {
    static toDomain(raw: PrismaFloor): Floor  {
        return new Floor({
            name: raw.name,
            buildingId: raw.buildingId,
            updatedAt: raw.updatedAt,
        }, raw.id)
    }

    static toPrisma(floor: Floor): Prisma.FloorUncheckedCreateInput {
        return {
            id: floor.id,
            name: floor.name,
            buildingId: floor.buildingId,
            updatedAt: floor.updatedAt ?? null
        }
    }
}