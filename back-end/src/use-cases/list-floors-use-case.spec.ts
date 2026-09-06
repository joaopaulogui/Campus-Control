import { beforeEach, describe, expect, test } from "vitest";
import { InMemoryFloorsRepository } from "../test/repositories/in-memory-floors-repository";
import { ListFloorsUseCase } from "./list-floors-use-case";
import { makeFloor } from "../test/factories/make-floor";
import { makeBuilding } from "../test/factories/make-building";
import { InMemoryBuildingsRepository } from "../test/repositories/in-memory-buildings-repository";

let floorsRepository: InMemoryFloorsRepository
let buildingsRepository: InMemoryBuildingsRepository
let sut: ListFloorsUseCase

describe("List all floors", () => {
    beforeEach(() => {
        floorsRepository = new InMemoryFloorsRepository()
        buildingsRepository = new InMemoryBuildingsRepository()
        sut = new ListFloorsUseCase(floorsRepository)
    })

    test("It should be able to list all floors", async () => {
        const building = makeBuilding()

        buildingsRepository.create(building)

        floorsRepository.create(makeFloor({ buildingId: building.id }))
        floorsRepository.create(makeFloor({ buildingId: building.id  }))

        expect(floorsRepository.items).toHaveLength(2)
    })
})