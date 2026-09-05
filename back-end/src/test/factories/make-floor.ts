import { Floor, type FloorProps } from "../../entities/floor";
import { faker } from "@faker-js/faker"

export function makeFloor(override: Partial<FloorProps> = {}, id?: string): Floor {
    const floor = new Floor({
        name: faker.lorem.word(),
        ...override,
    }, id)

    return floor
}