import { beforeEach, describe, expect, test } from "vitest";
import { InMemoryFloorsRepository } from "../test/repositories/in-memory-floors-repository";
import { RegisterFloorUseCase } from "./register-floor-use-case";
import { InMemoryBuildingsRepository } from "../test/repositories/in-memory-buildings-repository";
import { makeBuilding } from "../test/factories/make-building";

let floorsRepository: InMemoryFloorsRepository
let buildingsRepository: InMemoryBuildingsRepository
let sut: RegisterFloorUseCase

describe("Register Floor", () => {
    beforeEach(() => {
        floorsRepository = new InMemoryFloorsRepository()
        buildingsRepository = new InMemoryBuildingsRepository()
        sut = new RegisterFloorUseCase(floorsRepository, buildingsRepository)
    })

    test("It should be able to register a floor", async () => {
        const building = makeBuilding()

        buildingsRepository.create(building)
        
        await sut.execute({ name: "Floor 1", buildingId: building.id })

        expect(floorsRepository.items).toHaveLength(1)
    })
})