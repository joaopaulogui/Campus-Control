import { beforeEach, describe, expect, test } from "vitest";
import { InMemoryAirConditionersRepository } from "@test/repositories/in-memory-air-conditioners-repository";
import { ListAirConditionersUseCase } from "./list-air-conditioners-use-case";
import { makeAirConditioner } from "@test/factories/make-air-conditioner";
import { InMemoryUsersRepository } from "@/test/repositories/in-memory-users-repository";
import { makeUser } from "@/test/factories/make-user";
import { UserRole } from "../entities/user";

let airConditionersRepository: InMemoryAirConditionersRepository
let usersRepository: InMemoryUsersRepository
let sut: ListAirConditionersUseCase

describe("List air conditioners", () => {
    beforeEach(() => {
        airConditionersRepository = new InMemoryAirConditionersRepository()
        usersRepository = new InMemoryUsersRepository()
        sut = new ListAirConditionersUseCase(airConditionersRepository, usersRepository)
    })

    test("It should be able to list all air conditioners", async () => {
        const user = makeUser({ role: UserRole.ADMIN })

        usersRepository.create(user)

        const airConditioner1 = makeAirConditioner()
        airConditionersRepository.create(airConditioner1)

        const airConditioner2 = makeAirConditioner()
        airConditionersRepository.create(airConditioner2)

        const { airConditioners } = await sut.execute({ userId: user.id })

        expect(airConditioners).toHaveLength(2)
        expect(airConditioners).toEqual(expect.arrayContaining([
            expect.objectContaining({ id: airConditioner1.id }),
            expect.objectContaining({ id: airConditioner2.id }),
        ]))
    })
})