import { faker } from "@faker-js/faker";
import { AirConditioner, AirConditionerStatus, type AirConditionerProps } from "../../entities/air-conditioner";
import { randomUUID } from "node:crypto";

export function makeAirConditioner(override: Partial<AirConditionerProps>, id?: string): AirConditioner {
    const airConditioner = new AirConditioner({
        roomId: randomUUID(),
        temperature: faker.number.int({ min: 15, max: 35 }),
        status: faker.helpers.enumValue(AirConditionerStatus),
        isOn: faker.datatype.boolean()
    }, id)

    return airConditioner
}