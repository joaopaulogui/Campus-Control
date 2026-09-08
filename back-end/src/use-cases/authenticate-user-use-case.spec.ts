import { beforeEach, describe, expect, test } from "vitest";
import { FakeEncrypter } from "../test/cryptography/fake-encrypter";
import { FakeHasher } from "../test/cryptography/fake-hasher";
import { InMemoryUsersRepository } from "../test/repositories/in-memory-users-repository";
import { AuthenticateUserUseCase } from "./authenticate-user-use-case";
import { makeUser } from "../test/factories/make-user";

let usersRepository: InMemoryUsersRepository
let fakeHasher: FakeHasher
let fakeEncrypter: FakeEncrypter
let sut: AuthenticateUserUseCase

describe("Authenticate user", () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        fakeHasher = new FakeHasher(),
        fakeEncrypter = new FakeEncrypter()
        sut = new AuthenticateUserUseCase(usersRepository, fakeHasher, fakeEncrypter)
    })

    test("It should be able to authenticate user", async () => {
        const password = "123456"
        
        const user = makeUser({ password: await fakeHasher.hash(password) })

        usersRepository.create(user)

        const { accessToken } = await sut.execute({ email: user.email, password, })

        expect(accessToken).toEqual(expect.any(String))
    })
})