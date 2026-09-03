import { beforeEach, describe, expect, test } from "vitest";
import { InMemoryRoomsRepository } from "../test/repositories/in-memory-rooms-repository";
import { ToggleRoomLockUseCase } from "./toggle-room-lock-use-case";
import { InMemoryFloorsRepository } from "../test/repositories/in-memory-floors-repository";
import { makeFloor } from "../test/factories/make-floor";
import { makeRoom } from "../test/factories/make-room";

let floorsRepository: InMemoryFloorsRepository
let roomsRepository: InMemoryRoomsRepository
let sut: ToggleRoomLockUseCase

describe("Toggle room lock", () => {
    beforeEach(() => {
        floorsRepository = new InMemoryFloorsRepository()
        roomsRepository = new InMemoryRoomsRepository()
        sut = new ToggleRoomLockUseCase(roomsRepository)
    })

    test("It should be able to toggle if a room is locked or not", async () => {
        const floor = makeFloor()

        floorsRepository.create(floor)

        const room = makeRoom({ floorId: floor.id, isLocked: false })

        roomsRepository.create(room)

        await sut.execute({ roomId: room.id })

        expect(floorsRepository.items).toHaveLength(1)
        expect(roomsRepository.items).toHaveLength(1)
        expect(roomsRepository.items[0]?.isLocked).toBe(true)
    })
})