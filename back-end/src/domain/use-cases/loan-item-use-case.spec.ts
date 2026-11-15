import { beforeEach, describe, expect, test } from "vitest";
import { InMemoryItemsRepository } from "@test/repositories/in-memory-items-repository";
import { InMemoryLoansRepository } from "@test/repositories/in-memory-loans-repository";
import { LoanItemUseCase } from "./loan-item-use-case";
import { makeItem } from "@test/factories/make-item";
import { makeUser } from "@/test/factories/make-user";

let itemsRepository: InMemoryItemsRepository
let loansRepository: InMemoryLoansRepository
let sut: LoanItemUseCase

describe("Loan item", () => {
    beforeEach(() => {
        itemsRepository = new InMemoryItemsRepository()
        loansRepository = new InMemoryLoansRepository()
        sut = new LoanItemUseCase(itemsRepository, loansRepository)
    })

    test("It should be able to loan an item", async () => {
        const user = makeUser()

        const item = makeItem({ availableQuantity: 10 })

        itemsRepository.create(item)

        await sut.execute({
            userId: user.id,
            responsibleName: "John Doe",
            responsibleRegistration: "123456",
            itemId: item.id,
            quantity: 1,
            deadline: new Date()
        })

        expect(loansRepository.items).toHaveLength(1)
        expect(loansRepository.items[0]).toEqual(expect.objectContaining({ responsibleName: "John Doe" }))
        expect(itemsRepository.items).toHaveLength(1)
        expect(itemsRepository.items[0]?.availableQuantity).toBe(9)
    })
})