import { beforeEach, describe, expect, test } from "vitest";
import { InMemoryFloorsRepository } from "../test/repositories/in-memory-floors-repository";
import { UpdateFloorUseCase } from "./update-floor-use-case";
import { makeFloor } from "../test/factories/make-floor";

let floorsRepository: InMemoryFloorsRepository
let sut: UpdateFloorUseCase

describe("Update floor", () => {
    beforeEach(() => {
        floorsRepository = new InMemoryFloorsRepository()
        sut = new UpdateFloorUseCase(floorsRepository)
    })

    test("It should be able to update a floor", async () => {
        const floor = makeFloor()

        floorsRepository.create(floor)

        await sut.execute({ floorId: floor.id, name: "Test name" })

        expect(floorsRepository.items[0]).toEqual(expect.objectContaining({ name: "Test name" }))
    })
})