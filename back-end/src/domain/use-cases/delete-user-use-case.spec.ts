import { InMemoryUsersRepository } from "@/test/repositories/in-memory-users-repository";
import { DeleteUserUseCase } from "./delete-user-use-case";
import { FakeHasher } from "@/test/cryptography/fake-hasher";
import { makeUser } from "@/test/factories/make-user";
import { UserRole } from "../entities/user";
import { InMemoryBuildingsRepository } from "@/test/repositories/in-memory-buildings-repository";

let usersRepository: InMemoryUsersRepository
let sut: DeleteUserUseCase

describe('Delete user', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new DeleteUserUseCase(usersRepository)
    })

    test('It should be able to delete an user', async () => {
        const admin = makeUser({ role: UserRole.ADMIN })

        const user = makeUser()

        usersRepository.create(user)

        await sut.execute({ userId: user.id, adminId: admin.id })

        expect(usersRepository.items).toHaveLength(1)
        expect(usersRepository.items[0]).toEqual(expect.objectContaining({ deletedAt: expect.any(Date) }))
    })
})