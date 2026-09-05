import { Floor } from "../entities/floor";
import { Prisma, type Floor as PrismaFloor } from '../generated/prisma/client'

export class PrismaFloorMapper {
    static toDomain(raw: PrismaFloor): Floor  {
        return new Floor({
            name: raw.name
        }, raw.id)
    }

    static toPrisma(floor: Floor): Prisma.FloorUncheckedCreateInput {
        return {
            id: floor.id,
            name: floor.name,
        }
    }
}