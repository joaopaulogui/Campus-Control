import { beforeEach, describe, expect, test } from "vitest";
import { DeleteFloorUseCase } from "./delete-floor-use-case";
import { InMemoryFloorsRepository } from "../test/repositories/in-memory-floors-repository";
import { makeFloor } from "../test/factories/make-floor";

let floorsRepository: InMemoryFloorsRepository
let sut: DeleteFloorUseCase

describe("Delete floor", () => {
    beforeEach(() => {
        floorsRepository = new InMemoryFloorsRepository()
        sut = new DeleteFloorUseCase(floorsRepository)
    })

    test("It should be able to delete a floor", async () => {
        const floor = makeFloor()

        floorsRepository.create(floor)

        expect(floorsRepository.items).toHaveLength(1)
        
        await sut.execute({ floorId: floor.id })
        
        expect(floorsRepository.items).toHaveLength(0)
    })
})