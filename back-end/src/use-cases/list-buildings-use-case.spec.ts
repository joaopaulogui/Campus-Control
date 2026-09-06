import { beforeEach, describe, expect, test } from "vitest";
import { InMemoryBuildingsRepository } from "../test/repositories/in-memory-buildings-repository";
import { ListBuildingsUseCase } from "./list-buildings-use-case";
import { makeBuilding } from "../test/factories/make-building";

let buildingsRepository: InMemoryBuildingsRepository
let sut: ListBuildingsUseCase

describe("List buildings", () => {
    beforeEach(() => {
        buildingsRepository = new InMemoryBuildingsRepository()
        sut = new ListBuildingsUseCase(buildingsRepository)
    })

    test("It should be able to list all buildings", async () => {
        buildingsRepository.create(makeBuilding())
        buildingsRepository.create(makeBuilding())

        const { buildings } = await sut.execute()

        expect(buildings).toHaveLength(2)
    })
})