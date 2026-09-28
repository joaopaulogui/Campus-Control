import { beforeEach, describe, expect, test } from "vitest";
import { InMemoryAirConditionersRepository } from "../test/repositories/in-memory-air-conditioners-repository";
import { UpdateAirConditionerStatusUseCase } from "./update-air-conditioner-status-use-case";
import { makeAirConditioner } from "../test/factories/make-air-conditioner";
import { AirConditionerStatus } from "../entities/air-conditioner";

let airconditionersRepository: InMemoryAirConditionersRepository
let sut: UpdateAirConditionerStatusUseCase

describe("Update air conditioner", () => {
    beforeEach(() => {
        airconditionersRepository = new InMemoryAirConditionersRepository()
        sut = new UpdateAirConditionerStatusUseCase(airconditionersRepository)
    })

    test("It should be able to update an air conditioner", async () => {
        const airConditioner = makeAirConditioner({ status: AirConditionerStatus.WORKING })

        airconditionersRepository.create(airConditioner)

        await sut.execute({ airConditionerId: airConditioner.id, status: AirConditionerStatus.BROKEN })

        expect(airconditionersRepository.items[0]).toEqual(expect.objectContaining({ status: AirConditionerStatus.BROKEN }))
    })
})