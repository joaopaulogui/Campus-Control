import { beforeEach, describe, expect, test } from "vitest";
import { InMemoryFloorsRepository } from "../test/repositories/in-memory-floors-repository";
import { CreateFloorUseCase } from "./create-floor-use-case";

let floorsRepository: InMemoryFloorsRepository
let sut: CreateFloorUseCase

describe("Create Floor", () => {
    beforeEach(() => {
        floorsRepository = new InMemoryFloorsRepository()
        sut = new CreateFloorUseCase(floorsRepository)
    })

    test("It should be able to create a floor", async () => {
        await sut.execute({ name: "Floor 1", })

        expect(floorsRepository.items).toHaveLength(1)
    })
})