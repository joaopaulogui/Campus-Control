import { describe, test, beforeEach, expect } from "vitest";
import { InMemoryFloorsRepository } from "../test/repositories/in-memory-floors-repository";
import { InMemoryRoomsRepository } from "../test/repositories/in-memory-rooms-repository";
import { ListRoomsUseCase } from "./list-rooms-use-case";
import { makeFloor } from "../test/factories/make-floor";
import { makeRoom } from "../test/factories/make-room";
import { InMemoryBuildingsRepository } from "../test/repositories/in-memory-buildings-repository";
import { makeBuilding } from "../test/factories/make-building";

let buildingsRepository: InMemoryBuildingsRepository
let floorsRepository: InMemoryFloorsRepository
let roomsRepository: InMemoryRoomsRepository
let sut: ListRoomsUseCase

describe('List Floors', () => {
    beforeEach(() => {
        buildingsRepository = new InMemoryBuildingsRepository()
        floorsRepository = new InMemoryFloorsRepository()
        roomsRepository = new InMemoryRoomsRepository()
        sut = new ListRoomsUseCase(floorsRepository, roomsRepository)
    })

    test('It should be able to list all rooms of a building', async () => {
        const building1 = makeBuilding()
        buildingsRepository.create(building1)

        const floor1 = makeFloor({ buildingId: building1.id })
        const floor2 = makeFloor({ buildingId: building1.id })
        floorsRepository.create(floor1)
        floorsRepository.create(floor2)

        const room1 = makeRoom({ floorId: floor1.id })        
        const room2 = makeRoom({ floorId: floor2.id })        
        roomsRepository.create(room1)
        roomsRepository.create(room2)

        const building2 = makeBuilding()
        buildingsRepository.create(building2)

        const floor3 = makeFloor({ buildingId: building2.id })
        floorsRepository.create(floor3)
        
        const room3 = makeRoom({ floorId: floor3.id })
        roomsRepository.create(room3)

        const result = await sut.execute({ buildingId: building1.id })

        expect(result.rooms).toHaveLength(2)
        expect(result.rooms).toEqual(expect.arrayContaining([
            expect.objectContaining({ name: room1.name }),
            expect.objectContaining({ name: room2.name }),
        ]))
    })

    test('It should be able to list all rooms from a specified floor', async () => {
        const building = makeBuilding()
        buildingsRepository.create(building)

        const floor1 = makeFloor({ buildingId: building.id })
        const floor2 = makeFloor({ buildingId: building.id })

        floorsRepository.create(floor1)
        floorsRepository.create(floor2)


        const room1 = makeRoom({ floorId: floor1.id })
        const room2 = makeRoom({ floorId: floor1.id })
        const room3 = makeRoom({ floorId: floor2.id })

        roomsRepository.create(room1)
        roomsRepository.create(room2)
        roomsRepository.create(room3)

        const result = await sut.execute({ buildingId: building.id, floorId: floor1.id })

        expect(result.rooms).toHaveLength(2)
        expect(result.rooms).toEqual(expect.arrayContaining([
            expect.objectContaining({ name: room1.name }),
            expect.objectContaining({ name: room2.name }),
        ]))
    })
})