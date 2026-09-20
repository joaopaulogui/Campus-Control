import { faker } from "@faker-js/faker";
import { Loan, LoanStatus, type LoanProps } from "../../entities/loan";
import { randomUUID } from "node:crypto";

export function makeLoan(override: Partial<LoanProps> = {}, id?: string): Loan {
    return new Loan({
        responsibleName: faker.person.fullName(),
        responsibleRegistration: faker.lorem.word(),
        itemId: randomUUID(),
        quantity: faker.number.int({ min: 1, max: 10 }),
        deadline: faker.date.future(),
        status: faker.helpers.enumValue(LoanStatus),
        createdAt: new Date(),
        ...override
    }, id)
}