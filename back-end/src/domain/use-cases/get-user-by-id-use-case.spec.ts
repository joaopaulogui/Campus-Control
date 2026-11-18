import { InMemoryUsersRepository } from "@/test/repositories/in-memory-users-repository";
import { GetUserByIdUseCase } from "./get-user-by-id-use-case";
import { makeUser } from "@/test/factories/make-user";

let usersRepository: InMemoryUsersRepository
let sut: GetUserByIdUseCase

describe('Get user by id', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new GetUserByIdUseCase(usersRepository)
    })

    test("It should be able to get a user's information by its id", async () => {
        const testUser = makeUser()

        usersRepository.create(testUser)

        const { user } = await sut.execute({ userId: testUser.id })

        expect(user).toEqual(expect.objectContaining({ name: testUser.name }))
    })
})