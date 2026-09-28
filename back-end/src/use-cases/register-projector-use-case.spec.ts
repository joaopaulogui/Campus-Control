import { beforeEach, describe, expect, test } from "vitest";
import { InMemoryProjectorsRepository } from "../test/repositories/in-memory-projectors-repository";
import { InMemoryRoomsRepository } from "../test/repositories/in-memory-rooms-repository";
import { RegisterProjectorUseCase } from "./register-projector-use-case";
import { makeRoom } from "../test/factories/make-room";

let projectorsRepository: InMemoryProjectorsRepository
let roomsRepository: InMemoryRoomsRepository
let sut: RegisterProjectorUseCase

describe("Register projector", () => {
    beforeEach(() => {
        projectorsRepository = new InMemoryProjectorsRepository()
        roomsRepository = new InMemoryRoomsRepository()
        sut = new RegisterProjectorUseCase(projectorsRepository, roomsRepository)
    })

    test("It should be able to register a projector", async () => {
        const room = makeRoom()

        roomsRepository.create(room)

        await sut.execute({ roomId: room.id })

        expect(projectorsRepository.items).toHaveLength(1)
        expect(projectorsRepository.items[0]).toEqual(expect.objectContaining({ roomId: room.id }))
    })
})