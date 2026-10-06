import { Building } from "../entities/building";
import { Prisma, type Building as PrismaBuilding } from "../generated/prisma/client";

export class PrismaBuildingMapper {
    static toDomain(raw: PrismaBuilding): Building {
        return new Building({
            name: raw.name,
            updatedAt: raw.updatedAt,
        }, raw.id)
    }

    static toPrisma(building: Building): Prisma.BuildingUncheckedCreateInput {
        return {
            id: building.id,
            name: building.name,
            updatedAt: building.updatedAt ?? null
        }
    }
}