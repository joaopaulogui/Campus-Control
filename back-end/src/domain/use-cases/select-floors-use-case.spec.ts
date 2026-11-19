import { beforeEach, describe, expect, test } from "vitest";
import { InMemoryFloorsRepository } from "@test/repositories/in-memory-floors-repository";
import { SelectFloorsUseCase } from "./select-floors-use-case";
import { makeFloor } from "@test/factories/make-floor";
import { InMemoryUsersRepository } from "@/test/repositories/in-memory-users-repository";
import { makeUser } from "@/test/factories/make-user";
import { UserRole } from "../entities/user";

let floorsRepository: InMemoryFloorsRepository
let usersRepository: InMemoryUsersRepository
let sut: SelectFloorsUseCase

describe("Select floors", () => {
    beforeEach(() => {
        floorsRepository = new InMemoryFloorsRepository()
        usersRepository = new InMemoryUsersRepository()
        sut = new SelectFloorsUseCase(floorsRepository, usersRepository)
    })

    test("It should be able to select all floors", async () => {
        const user = makeUser({ role: UserRole.ADMIN })

        usersRepository.create(user)

        const floor1 = makeFloor()
        const floor2 = makeFloor()

        floorsRepository.create(floor1)
        floorsRepository.create(floor2)

        const { floors } = await sut.execute({ userId: user.id })

        expect(floors).toHaveLength(2)
        expect(floors).toEqual(expect.arrayContaining([
            expect.objectContaining({ id: floor1.id }),
            expect.objectContaining({ id: floor2.id }),
        ]))
    })
})