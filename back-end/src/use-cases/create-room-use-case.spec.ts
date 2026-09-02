import { beforeEach, describe, expect, test } from "vitest";
import { InMemoryFloorsRepository } from "../test/repositories/in-memory-floors-repository";
import { InMemoryRoomsRepository } from "../test/repositories/in-memory-rooms-repository";
import { CreateRoomUseCase } from "./create-room-use-case";
import { makeFloor } from "../test/factories/make-floor";
import { RoomType } from "../entities/room";

let floorsRepository: InMemoryFloorsRepository
let roomsRepository: InMemoryRoomsRepository
let sut: CreateRoomUseCase

describe("Create Room", () => {
    beforeEach(() => {
        floorsRepository = new InMemoryFloorsRepository()
        roomsRepository = new InMemoryRoomsRepository()
        sut = new CreateRoomUseCase(roomsRepository, floorsRepository)
    })

    test("It should be able to create a room", async () => {
        const floor = makeFloor()

        floorsRepository.create(floor)

        await sut.execute({
            name: "Floor 1",
            type: RoomType.CLASSROOM,
            capacity: 30,
            floorId: floor.id,
        })

        expect(roomsRepository.items).toHaveLength(1)
    })

    test("It should not be able to create a room in an unexistent floor", async () => {
        expect(async() => await sut.execute({
            name: "Floor 1",
            type: RoomType.CLASSROOM,
            capacity: 30,
            floorId: "1",
        })).rejects.toThrow()
    })
})