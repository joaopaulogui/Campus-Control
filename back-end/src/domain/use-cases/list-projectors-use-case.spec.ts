import { beforeEach, describe, expect, test } from "vitest";
import { InMemoryProjectorsRepository } from "@test/repositories/in-memory-projectors-repository";
import { InMemoryRoomsRepository } from "@test/repositories/in-memory-rooms-repository";
import { InMemoryFloorsRepository } from "@test/repositories/in-memory-floors-repository";
import { ListProjectorsUseCase } from "./list-projectors-use-case";
import { makeRoom } from "@test/factories/make-room";
import { makeFloor } from "@test/factories/make-floor";
import { makeProjector } from "@test/factories/make-projector";
import { makeBuilding } from "@test/factories/make-building";
import { InMemoryBuildingsRepository } from "@test/repositories/in-memory-buildings-repository";

let projectorsRepository: InMemoryProjectorsRepository
let roomsRepository: InMemoryRoomsRepository
let floorsRepository: InMemoryFloorsRepository
let buildingsRepository: InMemoryBuildingsRepository
let sut: ListProjectorsUseCase

describe("List floor with rooms and ACs", () => {
    beforeEach(() => {
        projectorsRepository = new InMemoryProjectorsRepository()
        roomsRepository = new InMemoryRoomsRepository()
        floorsRepository = new InMemoryFloorsRepository()
        buildingsRepository = new InMemoryBuildingsRepository()
        sut = new ListProjectorsUseCase(
            projectorsRepository, 
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

        const projector1 = makeProjector({ roomId: room1.id })
        projectorsRepository.create(projector1)

        const projector2 = makeProjector({ roomId: room3.id })
        projectorsRepository.create(projector2)

        const { projectors } = await sut.execute({ buildingId: building.id })

        expect(projectors).toHaveLength(2)
    })
})