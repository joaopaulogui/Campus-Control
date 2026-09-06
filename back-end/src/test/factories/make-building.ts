import { faker } from "@faker-js/faker";
import { Building, type BuildingProps } from "../../entities/building";

export function makeBuilding(override: Partial<BuildingProps> = {}, id?: string): Building {
    const building = new Building({
        name: faker.lorem.words({ min: 1, max: 5 }),
        ...override,
    }, id)

    return building
}