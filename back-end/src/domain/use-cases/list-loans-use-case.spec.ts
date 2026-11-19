import { beforeEach, describe, expect, test } from "vitest";
import { ListLoansUseCase } from "./list-loans-use-case";
import { makeItem } from "@test/factories/make-item";
import { InMemoryLoansRepository } from "@test/repositories/in-memory-loans-repository";
import { makeLoan } from "@test/factories/make-loan";

let loansRepository: InMemoryLoansRepository
let sut: ListLoansUseCase

describe("List loans", () => {
    beforeEach(() => {
        loansRepository = new InMemoryLoansRepository()
        sut = new ListLoansUseCase(loansRepository)
    })

    test("It should be able to list all the loans", async () => {
        const loan1 = makeLoan()
        const loan2 = makeLoan()

        loansRepository.create(loan1)
        loansRepository.create(loan2)

        const { loans } = await sut.execute({})

        expect(loans).toHaveLength(2)
    })
})