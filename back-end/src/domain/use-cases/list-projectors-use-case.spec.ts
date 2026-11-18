import { beforeEach, describe, expect, test } from "vitest";
import { InMemoryProjectorsRepository } from "@test/repositories/in-memory-projectors-repository";
import { ListProjectorsUseCase } from "./list-projectors-use-case";
import { makeProjector } from "@test/factories/make-projector";
import { InMemoryUsersRepository } from "@/test/repositories/in-memory-users-repository";
import { makeUser } from "@/test/factories/make-user";
import { UserRole } from "../entities/user";

let projectorsRepository: InMemoryProjectorsRepository
let usersRepository: InMemoryUsersRepository
let sut: ListProjectorsUseCase

describe("List projectors", () => {
    beforeEach(() => {
        projectorsRepository = new InMemoryProjectorsRepository()
        usersRepository = new InMemoryUsersRepository()
        sut = new ListProjectorsUseCase(projectorsRepository, usersRepository)
    })

    test("It should be able to list all projectors", async () => {
        const user = makeUser({ role: UserRole.ADMIN })

        usersRepository.create(user)

        const projector1 = makeProjector()
        projectorsRepository.create(projector1)

        const projector2 = makeProjector()
        projectorsRepository.create(projector2)

        const { projectors } = await sut.execute({ userId: user.id })

        expect(projectors).toHaveLength(2)
        expect(projectors).toEqual(expect.arrayContaining([
            expect.objectContaining({ id: projector1.id }),
            expect.objectContaining({ id: projector2.id }),
        ]))
    })
})