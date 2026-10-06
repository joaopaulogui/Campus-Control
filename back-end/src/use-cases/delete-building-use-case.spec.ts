import { beforeEach, describe, expect, test } from "vitest";
import { DeleteBuildingUseCase } from "./delete-building-use-case";
import { InMemoryBuildingsRepository } from "../test/repositories/in-memory-buildings-repository";
import { makeBuilding } from "../test/factories/make-building";

let buildingsRepository: InMemoryBuildingsRepository
let sut: DeleteBuildingUseCase

describe("Delete building", () => {
    beforeEach(() => {
        buildingsRepository = new InMemoryBuildingsRepository()
        sut = new DeleteBuildingUseCase(buildingsRepository)
    })

    test("It should be able to delete a building", async () => {
        const building = makeBuilding()

        buildingsRepository.create(building)

        expect(buildingsRepository.items).toHaveLength(1)
        
        await sut.execute({ buildingId: building.id })
        
        expect(buildingsRepository.items).toHaveLength(0)
    })
})