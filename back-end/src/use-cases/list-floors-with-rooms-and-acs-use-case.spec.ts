import { beforeEach, describe, expect, test } from "vitest";
import { InMemoryAirConditionersRepository } from "../test/repositories/in-memory-air-conditioners-repository";
import { InMemoryRoomsRepository } from "../test/repositories/in-memory-rooms-repository";
import { InMemoryFloorsRepository } from "../test/repositories/in-memory-floors-repository";
import { ListFloorsWithRoomsAndAirConditionersUseCase } from "./list-floors-with-rooms-and-acs-use-case";
import { makeRoom } from "../test/factories/make-room";
import { makeFloor } from "../test/factories/make-floor";
import { makeAirConditioner } from "../test/factories/make-air-conditioner";

let airConditionersRepository: InMemoryAirConditionersRepository
let roomsRepository: InMemoryRoomsRepository
let floorsRepository: InMemoryFloorsRepository
let sut: ListFloorsWithRoomsAndAirConditionersUseCase

describe("List ari conditioners", () => {
    beforeEach(() => {
        airConditionersRepository = new InMemoryAirConditionersRepository()
        roomsRepository = new InMemoryRoomsRepository()
        floorsRepository = new InMemoryFloorsRepository()
        sut = new ListFloorsWithRoomsAndAirConditionersUseCase(airConditionersRepository, roomsRepository, floorsRepository)
    })

    test("It should be able to list all floors with rooms and acs", async () => {
        const floor1 = makeFloor()
        floorsRepository.create(floor1)

        const floor2 = makeFloor()
        floorsRepository.create(floor2)

        const room1 = makeRoom({ floorId: floor1.id })
        roomsRepository.create(room1)

        const room2 = makeRoom({ floorId: floor1.id })
        roomsRepository.create(room2)

        const room3 = makeRoom({ floorId: floor2.id })
        roomsRepository.create(room3)

        const airConditioner1 = makeAirConditioner({ roomId: room1.id })
        airConditionersRepository.create(airConditioner1)

        const airConditioner2 = makeAirConditioner({ roomId: room3.id })
        airConditionersRepository.create(airConditioner2)

        const { floorsWithRoomsAndAirConditioners } = await sut.execute({})

        expect(floorsWithRoomsAndAirConditioners).toHaveLength(2)

        const floor1Result = floorsWithRoomsAndAirConditioners.find((f) => f.floor.id === floor1.id)
        expect(floor1Result?.rooms).toHaveLength(2)

        const room1Result = floor1Result?.rooms.find((r) => r.room.id === room1.id)
        expect(room1Result?.airConditioners).toHaveLength(1)
        expect(room1Result?.airConditioners[0]?.id).toEqual(airConditioner1.id)

        const floor2Result = floorsWithRoomsAndAirConditioners.find((f) => f.floor.id === floor2.id)
        expect(floor2Result?.rooms).toHaveLength(1)

        const room2Result = floor2Result?.rooms.find((r) => r.room.id === room2.id)
        expect(room2Result?.airConditioners).toBeFalsy()

        const room3Result = floor2Result?.rooms.find((r) => r.room.id === room3.id)
        expect(room3Result?.airConditioners).toHaveLength(1)
        expect(room3Result?.airConditioners[0]?.id).toEqual(airConditioner2.id)
    })
})