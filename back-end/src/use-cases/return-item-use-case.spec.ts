import { beforeEach, describe, expect, test } from "vitest";
import { InMemoryItemsRepository } from "../test/repositories/in-memory-items-repository";
import { InMemoryLoansRepository } from "../test/repositories/in-memory-loans-repository";
import { ReturnItemUseCase } from "./return-item-use-case";
import { makeItem } from "../test/factories/make-item";
import { makeLoan } from "../test/factories/make-loan";
import { LoanStatus } from "../entities/loan";

let loansRepository: InMemoryLoansRepository
let itemsRepository: InMemoryItemsRepository
let sut: ReturnItemUseCase

describe("Return item", () => {
    beforeEach(() => {
        loansRepository = new InMemoryLoansRepository()
        itemsRepository = new InMemoryItemsRepository()
        sut = new ReturnItemUseCase(loansRepository, itemsRepository)
    })

    test("It should be able to return an item", async () => {
        const item = makeItem({ totalQuantity: 30, availableQuantity: 20 })

        itemsRepository.create(item)

        const loan = makeLoan({ itemId: item.id, quantity: 5, status: LoanStatus.IN_USE})

        loansRepository.create(loan)

        await sut.execute({ loanId: loan.id })

        expect(itemsRepository.items[0]).toEqual(expect.objectContaining({ availableQuantity: 25 }))
        expect(loansRepository.items[0]).toEqual(expect.objectContaining({ returnedAt: expect.any(Date) }))
    })
})