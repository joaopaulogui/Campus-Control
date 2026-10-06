import { beforeEach, describe, expect, test } from "vitest";
import { DeleteRoomUseCase } from "./delete-room-use-case";
import { InMemoryRoomsRepository } from "../test/repositories/in-memory-rooms-repository";
import { makeRoom } from "../test/factories/make-room";

let roomsRepository: InMemoryRoomsRepository
let sut: DeleteRoomUseCase

describe("Delete room", () => {
    beforeEach(() => {
        roomsRepository = new InMemoryRoomsRepository()
        sut = new DeleteRoomUseCase(roomsRepository)
    })

    test("It should be able to delete a room", async () => {
        const room = makeRoom()

        roomsRepository.create(room)

        expect(roomsRepository.items).toHaveLength(1)
        
        await sut.execute({ roomId: room.id })
        
        expect(roomsRepository.items).toHaveLength(0)
    })
})