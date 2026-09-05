import type { Floor } from "../entities/floor";

export class FloorPresenter {
    static toHTTP(floor: Floor) {
        return {
            id: floor.id,
            name: floor.name,
        }
    }
}