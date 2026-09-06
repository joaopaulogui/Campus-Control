import { beforeEach, describe, expect, test } from "vitest";
import { InMemoryFloorsRepository } from "../test/repositories/in-memory-floors-repository";
import { CreateFloorUseCase } from "./create-floor-use-case";
import { InMemoryBuildingsRepository } from "../test/repositories/in-memory-buildings-repository";
import { makeBuilding } from "../test/factories/make-building";

let floorsRepository: InMemoryFloorsRepository
let buildingsRepository: InMemoryBuildingsRepository
let sut: CreateFloorUseCase

describe("Create Floor", () => {
    beforeEach(() => {
        floorsRepository = new InMemoryFloorsRepository()
        buildingsRepository = new InMemoryBuildingsRepository()
        sut = new CreateFloorUseCase(floorsRepository, buildingsRepository)
    })

    test("It should be able to create a floor", async () => {
        const building = makeBuilding()

        buildingsRepository.create(building)
        
        await sut.execute({ name: "Floor 1", buildingId: building.id })

        expect(floorsRepository.items).toHaveLength(1)
    })
})