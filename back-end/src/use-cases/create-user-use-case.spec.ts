import { beforeEach, describe, expect, test } from "vitest";
import { InMemoryUsersRepository } from "../test/repositories/in-memory-users-repository";
import { CreateUserUseCase } from "./create-user-use-case";
import { UserRole } from "../entities/user";
import { compare, hash } from "bcryptjs";

let usersRepository: InMemoryUsersRepository
let sut: CreateUserUseCase

describe("Create user", () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new CreateUserUseCase(usersRepository)
    })

    test("It should be able to create an user", async () => {
        await sut.execute({
            name: "Test user",
            email: "email@example.com",
            password: "123456",
            role: UserRole.MEMBER
        })

        expect(usersRepository.items).toHaveLength(1)
        expect(usersRepository.items[0]).toEqual(expect.objectContaining({ name: "Test user" }))

        expect(await compare("123456", usersRepository.items[0]?.password!)).toBe(true)
    })
})