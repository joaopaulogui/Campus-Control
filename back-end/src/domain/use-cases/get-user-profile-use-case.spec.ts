import { InMemoryUsersRepository } from "@/test/repositories/in-memory-users-repository"
import { GetUserProfileUseCase } from "./get-user-profile-use-case"
import { makeUser } from "@/test/factories/make-user"
import { InMemoryBuildingsRepository } from "@/test/repositories/in-memory-buildings-repository"

let usersRepository: InMemoryUsersRepository
let buildingsRepository: InMemoryBuildingsRepository
let sut: GetUserProfileUseCase

describe('Get user profile', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        buildingsRepository = new InMemoryBuildingsRepository
        sut = new GetUserProfileUseCase(usersRepository, buildingsRepository)
    })

    test('It should be able to get an user profile', async () => {
        const testUser = makeUser()

        usersRepository.create(testUser)

        const { user } = await sut.execute({ userId: testUser.id })

        expect(user).toEqual(expect.objectContaining({ id: testUser.id }))
    })
})