import { beforeEach, describe, expect, test } from "vitest";
import { InMemoryAirConditionersRepository } from "../test/repositories/in-memory-air-conditioners-repository";
import { ToggleAirConditionerUseCase } from "./toggle-air-conditioner-use-case";
import { makeAirConditioner } from "../test/factories/make-air-conditioner";

let airConditionersRepository: InMemoryAirConditionersRepository
let sut: ToggleAirConditionerUseCase

describe("Toggle air conditioner", () => {
    beforeEach(() => {
        airConditionersRepository = new InMemoryAirConditionersRepository()
        sut = new ToggleAirConditionerUseCase(airConditionersRepository)
    })

    test("It should be able to toggle an air conditioner", async () => {
        const airConditioner = makeAirConditioner({ isOn: false })

        airConditionersRepository.create(airConditioner)

        await sut.execute({ id: airConditioner.id })

        expect(airConditioner.isOn).toBe(true)
    })
})