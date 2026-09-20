import { beforeEach, describe, expect, test } from "vitest";
import { InMemoryItemsRepository } from "../test/repositories/in-memory-items-repository";
import { RegisterItemUseCase } from "./register-item-use-case";
import { ItemType } from "../entities/item";

let itemsRepository: InMemoryItemsRepository
let sut: RegisterItemUseCase

describe("Register item", () => {
    beforeEach(() => {
        itemsRepository = new InMemoryItemsRepository()
        sut = new RegisterItemUseCase(itemsRepository)
    })

    test("It should be able to register an item", async () => {
        await sut.execute({
            name: "Test item",
            type: ItemType.EQUIPMENT,
            totalQuantity: 30
        })

        expect(itemsRepository.items).toHaveLength(1)
        expect(itemsRepository.items[0]).toEqual(expect.objectContaining({ name: "Test item" }))
    })
})