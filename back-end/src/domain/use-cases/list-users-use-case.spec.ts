import { describe, test, beforeEach, expect } from "vitest";
import { InMemoryUsersRepository } from "@test/repositories/in-memory-users-repository";
import { ListUsersUseCase } from "./list-users-use-case";
import { makeUser } from "@test/factories/make-user";
import { UserRole } from "../entities/user";

let usersRepository: InMemoryUsersRepository
let sut: ListUsersUseCase

describe('List Floors', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new ListUsersUseCase(usersRepository)
    })

    test('It should be able to list all users', async () => {
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