import type { FloorWithBuilding } from "@/domain/entities/value-objects/floor-with-building";
import type { Floor } from "@domain/entities/floor";

export class FloorPresenter {
    static toHTTP(floor: Floor) {
        return {
            id: floor.id,
            name: floor.name,
            buildingId: floor.buildingId,
            updatedAt: floor.updatedAt?.toISOString()
        }
    }

    static toHttpWithBuilding(floorWithBuilding: FloorWithBuilding) {
        return {
            id: floorWithBuilding.id,
            name: floorWithBuilding.name,
            buildingId: floorWithBuilding.buildingId,
            buildingName: floorWithBuilding.buildingName,
            updatedAt: floorWithBuilding.updatedAt?.toISOString()
        }
    }

    static toSelect(floor: Floor) {
        return {
            id: floor.id,
            name: floor.name,
        }
    }
}