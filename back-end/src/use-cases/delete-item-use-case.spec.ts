import { beforeEach, describe, expect, test } from "vitest";
import { InMemoryItemsRepository } from "../test/repositories/in-memory-items-repository";
import { DeleteItemUseCase } from "./delete-item-use-case";
import { makeItem } from "../test/factories/make-item";

let itemsRepository: InMemoryItemsRepository
let sut: DeleteItemUseCase

describe("Delete item", () => {
    beforeEach(() => {
        itemsRepository = new InMemoryItemsRepository()
        sut = new DeleteItemUseCase(itemsRepository)
    })

    test("It should be able to delete an item", async () => {
        const item = makeItem({ totalQuantity: 30, availableQuantity: 20, onHoldQuantity: 5 })

        itemsRepository.create(item)

        await sut.execute({ itemId: item.id })

        expect(itemsRepository.items[0]).toEqual(expect.objectContaining({
            totalQuantity: 0,
            availableQuantity: 0,
            onHoldQuantity: 0
        }))
    })
})