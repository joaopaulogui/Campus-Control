import { beforeEach, describe, expect, test } from "vitest";
import { InMemoryFloorsRepository } from "../test/repositories/in-memory-floors-repository";
import { ListAllFloorsUseCase } from "./list-all-floors-use-case";
import { makeFloor } from "../test/factories/make-floor";

let floorsRepository: InMemoryFloorsRepository
let sut: ListAllFloorsUseCase

describe("List all floors", () => {
    beforeEach(() => {
        floorsRepository = new InMemoryFloorsRepository()
        sut = new ListAllFloorsUseCase(floorsRepository)
    })

    test("It should be able to list all floors", async () => {
        floorsRepository.create(makeFloor())
        floorsRepository.create(makeFloor())

        expect(floorsRepository.items).toHaveLength(2)
    })
})