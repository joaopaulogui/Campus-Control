import { InMemoryUsersRepository } from "@/test/repositories/in-memory-users-repository";
import { UpdateUserUseCase } from "./update-user-use-case";
import { FakeHasher } from "@/test/cryptography/fake-hasher";
import { makeUser } from "@/test/factories/make-user";
import { UserRole } from "../entities/user";
import { InMemoryBuildingsRepository } from "@/test/repositories/in-memory-buildings-repository";

let usersRepository: InMemoryUsersRepository
let fakeHasher: FakeHasher
let buildingsRepository: InMemoryBuildingsRepository
let sut: UpdateUserUseCase

describe('Update user', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        fakeHasher = new FakeHasher()
        buildingsRepository = new InMemoryBuildingsRepository()
        sut = new UpdateUserUseCase(usersRepository, fakeHasher, buildingsRepository)
    })

    test('It should be able to update an user', async () => {
        const admin = makeUser({ role: UserRole.ADMIN })

        const user = makeUser()

        usersRepository.create(user)

        await sut.execute({ userId: user.id, adminId: admin.id, name: "Test User" })

        expect(usersRepository.items).toHaveLength(1)
        expect(usersRepository.items[0]).toEqual(expect.objectContaining({ name: "Test User" }))
    })
})