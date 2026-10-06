import { beforeEach, describe, expect, test } from "vitest";
import { InMemoryRoomsRepository } from "../test/repositories/in-memory-rooms-repository";
import { UpdateRoomUseCase } from "./update-room-use-case";
import { makeRoom } from "../test/factories/make-room";
import { RoomType } from "../entities/room";

let roomsRepository: InMemoryRoomsRepository
let sut: UpdateRoomUseCase

describe("Update room", () => {
    beforeEach(() => {
        roomsRepository = new InMemoryRoomsRepository()
        sut = new UpdateRoomUseCase(roomsRepository)
    })

    test("It should be able to update a room", async () => {
        const room = makeRoom({ type: RoomType.CLASSROOM, capacity: 30 })

        roomsRepository.create(room)

        await sut.execute({ roomId: room.id, name: "Test name" })

        expect(roomsRepository.items[0]).toEqual(expect.objectContaining({ name: "Test name" }))

        await sut.execute({ roomId: room.id, type: RoomType.LAB })

        expect(roomsRepository.items[0]).toEqual(expect.objectContaining({ type: RoomType.LAB }))

        await sut.execute({ roomId: room.id, capacity: 31 })

        expect(roomsRepository.items[0]).toEqual(expect.objectContaining({ capacity: 31 }))
    })
})