import { InMemoryFloorsRepository } from "@/test/repositories/in-memory-floors-repository"
import { InMemoryUsersRepository } from "@/test/repositories/in-memory-users-repository"
import { GetFloorByIdUseCase } from "./get-floor-by-id-use-case"
import { makeUser } from "@/test/factories/make-user"
import { makeFloor } from "@/test/factories/make-floor"
import { makeBuilding } from "@/test/factories/make-building"

let usersRepository: InMemoryUsersRepository
let floorsRepository: InMemoryFloorsRepository
let sut: GetFloorByIdUseCase

describe('Get floor by id', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository(),
        floorsRepository = new InMemoryFloorsRepository()
        sut = new GetFloorByIdUseCase(usersRepository, floorsRepository)
    })

    test('It should be able to get a floor by id', async () => {
        const user = makeUser()
        usersRepository.create(user)

        const testBuilding = makeBuilding()

        const testFloor = makeFloor({ buildingId: testBuilding.id })
        floorsRepository.create(testFloor)

        user.buildingIds.push(testBuilding.id)

        const { floor } = await sut.execute({ userId: user.id, floorId: testFloor.id })

        expect(floor).toEqual(expect.objectContaining({ name: testFloor.name }))
    })
})