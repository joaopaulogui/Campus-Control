import { beforeEach, describe, expect, test } from "vitest";
import { InMemoryUsersRepository } from "../test/repositories/in-memory-users-repository";
import { RegisterUserUseCase } from "./register-user-use-case";
import { UserRole } from "../entities/user";
import { FakeHasher } from "../test/cryptography/fake-hasher";

let usersRepository: InMemoryUsersRepository
let fakeHasher: FakeHasher
let sut: RegisterUserUseCase

describe("Register user", () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        fakeHasher = new FakeHasher()
        sut = new RegisterUserUseCase(usersRepository, fakeHasher)
    })

    test("It should be able to register an user", async () => {
        await sut.execute({
            name: "Test user",
            email: "email@example.com",
            password: "123456",
            role: UserRole.MEMBER
        })

        expect(usersRepository.items).toHaveLength(1)
        expect(usersRepository.items[0]).toEqual(expect.objectContaining({ name: "Test user" }))

        expect(await fakeHasher.compare("123456", usersRepository.items[0]?.password!)).toBe(true)
    })
})