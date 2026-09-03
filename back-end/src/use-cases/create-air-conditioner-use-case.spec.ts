import { beforeEach, describe, expect, test } from "vitest";
import { InMemoryAirConditionersRepository } from "../test/repositories/in-memory-air-conditioners-repository";
import { InMemoryRoomsRepository } from "../test/repositories/in-memory-rooms-repository";
import { CreateAirConditionerUseCase } from "./create-air-conditioner-use-case";
import { makeRoom } from "../test/factories/make-room";
import { makeAirConditioner } from "../test/factories/make-air-conditioner";

let roomsRepository: InMemoryRoomsRepository
let airConditionersRepository: InMemoryAirConditionersRepository
let sut: CreateAirConditionerUseCase

describe("Create Air Conditioner", () => {
    beforeEach(() => {
        roomsRepository = new InMemoryRoomsRepository()
        airConditionersRepository = new InMemoryAirConditionersRepository()
        sut = new CreateAirConditionerUseCase(roomsRepository, airConditionersRepository)
    })

    test("It should be able to create an air conditioner", async () => {
        const room = makeRoom()
        roomsRepository.create(room)

        await sut.execute({ roomId: room.id, })

        expect(airConditionersRepository.items).toHaveLength(1)
    })

    test("It should be able to create an air conditioner in an unexistent room", async () => {
        expect(async () => (await sut.execute({ roomId: "1", }))).rejects.toThrow()
    })
})