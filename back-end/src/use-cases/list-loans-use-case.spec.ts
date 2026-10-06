import { beforeEach, describe, expect, test } from "vitest";
import { InMemoryItemsRepository } from "../test/repositories/in-memory-items-repository";
import { ListLoansUseCase } from "./list-loans-use-case";
import { makeItem } from "../test/factories/make-item";
import { InMemoryLoansRepository } from "../test/repositories/in-memory-loans-repository";
import { makeLoan } from "../test/factories/make-loan";

let itemsRepository: InMemoryItemsRepository
let loansRepository: InMemoryLoansRepository
let sut: ListLoansUseCase

describe("List loans", () => {
    beforeEach(() => {
        itemsRepository = new InMemoryItemsRepository()
        loansRepository = new InMemoryLoansRepository()
        sut = new ListLoansUseCase(itemsRepository, loansRepository)
    })

    test("It should be able to list all the loans", async () => {
        const item = makeItem()

        itemsRepository.create(item)

        const loan1 = makeLoan({ itemId: item.id })
        const loan2 = makeLoan({ itemId: item.id })

        loansRepository.create(loan1)
        loansRepository.create(loan2)

        const { loans } = await sut.execute({})

        expect(loans).toHaveLength(2)
    })
})