import type { FloorWithBuilding } from "@/domain/entities/value-objects/floor-with-building";
import type { PrismaFloorWithBuilding } from "../../queries/floor-with-building-query";

export class PrismaFloorWithBuildingMapper {
    static toFloorWithBuilding(raw: PrismaFloorWithBuilding): FloorWithBuilding {
        return {
            id: raw.id,
            name: raw.name,
            buildingId: raw.buildingId,
            buildingName: raw.building.name,
            updatedAt: raw.updatedAt
        }
    }
}