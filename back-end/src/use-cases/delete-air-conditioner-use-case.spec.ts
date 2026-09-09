import { beforeEach, describe, expect, test } from "vitest";
import { InMemoryAirConditionersRepository } from "../test/repositories/in-memory-air-conditioners-repository";
import { DeleteAirConditionerUseCase } from "./delete-air-conditioner-use-case";
import { makeAirConditioner } from "../test/factories/make-air-conditioner";

let airConditionersRepository: InMemoryAirConditionersRepository
let sut: DeleteAirConditionerUseCase

describe("Delete air conditioner", () => {
    beforeEach(() => {
        airConditionersRepository = new InMemoryAirConditionersRepository()
        sut = new DeleteAirConditionerUseCase(airConditionersRepository)
    })

    test("It should be able to delete an air conditioner", async () => {
        const airConditioner = makeAirConditioner()
        
        airConditionersRepository.create(airConditioner)

        expect(airConditionersRepository.items).toHaveLength(1)
        
        await sut.execute({ airConditionerId: airConditioner.id })
        
        expect(airConditionersRepository.items).toHaveLength(0)
    })
})