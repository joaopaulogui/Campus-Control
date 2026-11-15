import { beforeEach, describe, expect, test } from "vitest";
import { InMemoryAirConditionersRepository } from "@test/repositories/in-memory-air-conditioners-repository";
import { InMemoryRoomsRepository } from "@test/repositories/in-memory-rooms-repository";
import { InMemoryFloorsRepository } from "@test/repositories/in-memory-floors-repository";
import { ListAirConditionersUseCase } from "./list-air-conditioners-use-case";
import { makeRoom } from "@test/factories/make-room";
import { makeFloor } from "@test/factories/make-floor";
import { makeAirConditioner } from "@test/factories/make-air-conditioner";
import { makeBuilding } from "@test/factories/make-building";
import { InMemoryBuildingsRepository } from "@test/repositories/in-memory-buildings-repository";

let airConditionersRepository: InMemoryAirConditionersRepository
let roomsRepository: InMemoryRoomsRepository
let floorsRepository: InMemoryFloorsRepository
let buildingsRepository: InMemoryBuildingsRepository
let sut: ListAirConditionersUseCase

describe("List floor with rooms and ACs", () => {
    beforeEach(() => {
        airConditionersRepository = new InMemoryAirConditionersRepository()
        roomsRepository = new InMemoryRoomsRepository()
        floorsRepository = new InMemoryFloorsRepository()
        buildingsRepository = new InMemoryBuildingsRepository()
        sut = new ListAirConditionersUseCase(
            airConditionersRepository, 
            roomsRepository, 
            floorsRepository, 
            buildingsRepository
        )
    })

    test("It should be able to list all floors with rooms and acs", async () => {
        const building = makeBuilding()
        buildingsRepository.create(building)

        const floor1 = makeFloor({ buildingId: building.id })
        floorsRepository.create(floor1)

        const floor2 = makeFloor({ buildingId: building.id })
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

        const { airConditioners } = await sut.execute({ buildingId: building.id })

        expect(airConditioners).toHaveLength(2)
    })
})