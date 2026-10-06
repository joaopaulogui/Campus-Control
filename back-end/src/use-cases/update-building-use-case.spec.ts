import { beforeEach, describe, expect, test } from "vitest";
import { InMemoryBuildingsRepository } from "../test/repositories/in-memory-buildings-repository";
import { UpdateBuildingUseCase } from "./update-building-use-case";
import { makeBuilding } from "../test/factories/make-building";

let buildingsRepository: InMemoryBuildingsRepository
let sut: UpdateBuildingUseCase

describe("Update building", () => {
    beforeEach(() => {
        buildingsRepository = new InMemoryBuildingsRepository()
        sut = new UpdateBuildingUseCase(buildingsRepository)
    })

    test("It should be able to update a building", async () => {
        const building = makeBuilding()

        buildingsRepository.create(building)

        await sut.execute({ buildingId: building.id, name: "Test name" })

        expect(buildingsRepository.items[0]).toEqual(expect.objectContaining({ name: "Test name" }))
    })
})