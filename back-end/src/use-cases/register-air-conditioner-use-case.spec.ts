import { beforeEach, describe, expect, test } from "vitest";
import { InMemoryAirConditionersRepository } from "../test/repositories/in-memory-air-conditioners-repository";
import { InMemoryRoomsRepository } from "../test/repositories/in-memory-rooms-repository";
import { RegisterAirConditionerUseCase } from "./register-air-conditioner-use-case";
import { makeRoom } from "../test/factories/make-room";

let roomsRepository: InMemoryRoomsRepository
let airConditionersRepository: InMemoryAirConditionersRepository
let sut: RegisterAirConditionerUseCase

describe("Register Air Conditioner", () => {
    beforeEach(() => {
        roomsRepository = new InMemoryRoomsRepository()
        airConditionersRepository = new InMemoryAirConditionersRepository()
        sut = new RegisterAirConditionerUseCase(roomsRepository, airConditionersRepository)
    })

    test("It should be able to register an air conditioner", async () => {
        const room = makeRoom()
        roomsRepository.create(room)

        await sut.execute({ roomId: room.id, })

        expect(airConditionersRepository.items).toHaveLength(1)
    })

    test("It should not be able to register an air conditioner in an unexistent room", async () => {
        await expect(async () => (await sut.execute({ roomId: "1", }))).rejects.toThrow()
    })
})