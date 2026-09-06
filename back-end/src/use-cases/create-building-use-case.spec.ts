import { beforeEach, describe, expect, test } from "vitest";
import { InMemoryBuildingsRepository } from "../test/repositories/in-memory-buildings-repository";
import { CreateBuildingUseCase } from "./create-building-use-case";
import { Building } from "../entities/building";

let buildingsRepository: InMemoryBuildingsRepository
let sut: CreateBuildingUseCase

describe("Create building", () => {
    beforeEach(() => {
        buildingsRepository = new InMemoryBuildingsRepository()
        sut = new CreateBuildingUseCase(buildingsRepository)
    })

    test("It should be able to create building", async () => {
        await sut.execute({ name: "Building 1" })

        expect(buildingsRepository.items).toHaveLength(1)
        expect(buildingsRepository.items[0]).toEqual(expect.objectContaining({ name: "Building 1" }))
    })
})