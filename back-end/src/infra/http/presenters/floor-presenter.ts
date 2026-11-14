import type { Floor } from "@domain/entities/floor";

export class FloorPresenter {
    static toHTTP(floor: Floor) {
        return {
            id: floor.id,
            name: floor.name,
        }
    }

    static toSelect(floor: Floor) {
        return {
            id: floor.id,
            name: floor.name,
        }
    }
}