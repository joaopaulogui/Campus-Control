import { InMemoryBuildingsRepository } from "@/test/repositories/in-memory-buildings-repository"
import { InMemoryUsersRepository } from "@/test/repositories/in-memory-users-repository"
import { GetBuildingByIdUseCase } from "./get-building-by-id-use-case"
import { makeUser } from "@/test/factories/make-user"
import { makeBuilding } from "@/test/factories/make-building"

let usersRepository: InMemoryUsersRepository
let buildingsRepository: InMemoryBuildingsRepository
let sut: GetBuildingByIdUseCase

describe('Get building by id', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository(),
        buildingsRepository = new InMemoryBuildingsRepository()
        sut = new GetBuildingByIdUseCase(usersRepository, buildingsRepository)
    })

    test('It should be able to get a building by id', async () => {
        const user = makeUser()
        usersRepository.create(user)

        const testBuilding = makeBuilding()
        buildingsRepository.create(testBuilding)

        user.buildingIds.push(testBuilding.id)

        const { building } = await sut.execute({ userId: user.id, buildingId: testBuilding.id })

        expect(building).toEqual(expect.objectContaining({ name: testBuilding.name }))
    })
})