import type { Building } from "../entities/building";

export class BuildingPresenter {
    static toHTTP(building: Building) {
        return {
            id: building.id,
            name: building.name,
        }
    }
}