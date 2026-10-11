import { beforeEach, describe, expect, test } from "vitest";
import { InMemoryBuildingsRepository } from "../test/repositories/in-memory-buildings-repository";
import { RegisterBuildingUseCase } from "./register-building-use-case";
import { makeUser } from "../test/factories/make-user";

let buildingsRepository: InMemoryBuildingsRepository
let sut: RegisterBuildingUseCase

describe("Register building", () => {
    beforeEach(() => {
        buildingsRepository = new InMemoryBuildingsRepository()
        sut = new RegisterBuildingUseCase(buildingsRepository)
    })

    test("It should be able to register building", async () => {
        const user = makeUser()

        await sut.execute({ userId: user.id, name: "Building 1" })

        expect(buildingsRepository.items).toHaveLength(1)
        expect(buildingsRepository.items[0]).toEqual(expect.objectContaining({ name: "Building 1" }))
    })
})