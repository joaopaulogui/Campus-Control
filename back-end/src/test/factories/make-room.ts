import { faker } from "@faker-js/faker";
import { RoomType, Room, type RoomProps } from "../../entities/room";
import { randomUUID } from "node:crypto";

export function makeRoom(override: Partial<RoomProps> = {}, id?: string): Room {
    const room = new Room({
        name: faker.lorem.words({ min: 1, max: 5 }),
        type: faker.helpers.enumValue(RoomType),
        capacity: faker.number.int({ min: 5, max: 60 }),
        floorId: randomUUID(),
        isLocked: faker.datatype.boolean(),
        ...override,
    }, id)

    return room
}