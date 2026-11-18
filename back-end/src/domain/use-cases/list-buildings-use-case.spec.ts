import { beforeEach, describe, expect, test } from "vitest";
import { InMemoryBuildingsRepository } from "@test/repositories/in-memory-buildings-repository";
import { ListBuildingsUseCase } from "./list-buildings-use-case";
import { makeBuilding } from "@test/factories/make-building";
import { InMemoryUsersRepository } from "@/test/repositories/in-memory-users-repository";
import { makeUser } from "@/test/factories/make-user";
import { UserRole } from "../entities/user";

let buildingsRepository: InMemoryBuildingsRepository
let usersRepository: InMemoryUsersRepository
let sut: ListBuildingsUseCase

describe("List buildings", () => {
    beforeEach(() => {
        buildingsRepository = new InMemoryBuildingsRepository()
        usersRepository = new InMemoryUsersRepository()
        sut = new ListBuildingsUseCase(buildingsRepository, usersRepository)
    })

    test("It should be able to list all buildings", async () => {
        const user = makeUser({ role: UserRole.ADMIN })

        usersRepository.create(user)

        const building1 = makeBuilding()
        const building2 = makeBuilding()

        buildingsRepository.create(building1)
        buildingsRepository.create(building2)

        const { buildings } = await sut.execute({ userId: user.id })

        expect(buildings).toHaveLength(2)
        expect(buildings).toEqual(expect.arrayContaining([
            expect.objectContaining({ id: building1.id }),
            expect.objectContaining({ id: building2.id }),
        ]))
    })
})