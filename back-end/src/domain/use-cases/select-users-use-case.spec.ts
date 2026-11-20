import { describe, test, beforeEach, expect } from "vitest";
import { InMemoryUsersRepository } from "@test/repositories/in-memory-users-repository";
import { SelectUsersUseCase } from "./select-users-use-case";
import { makeUser } from "@test/factories/make-user";
import { UserRole } from "../entities/user";

let usersRepository: InMemoryUsersRepository
let sut: SelectUsersUseCase

describe('Select Floors', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new SelectUsersUseCase(usersRepository)
    })

    test('It should be able to select all users', async () => {
        const user = makeUser({ role: UserRole.ADMIN })

        usersRepository.create(user)

        const user1 = makeUser()             
        usersRepository.create(user1)

        const { users } = await sut.execute({})

        expect(users).toHaveLength(2)
        expect(users).toEqual(expect.arrayContaining([
            expect.objectContaining({ id: user.id }),
            expect.objectContaining({ id: user1.id }),
        ]))
    })
})