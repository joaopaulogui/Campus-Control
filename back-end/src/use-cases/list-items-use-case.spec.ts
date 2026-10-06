import { beforeEach, describe, expect, test } from "vitest";
import { InMemoryItemsRepository } from "../test/repositories/in-memory-items-repository";
import { ListItemsUseCase } from "./list-items-use-case";
import { makeItem } from "../test/factories/make-item";

let itemsRepository: InMemoryItemsRepository
let sut: ListItemsUseCase

describe("List items", () => {
    beforeEach(() => {
        itemsRepository = new InMemoryItemsRepository()
        sut = new ListItemsUseCase(itemsRepository)
    })

    test("It should be able to list all the items", async () => {
        const item1 = makeItem()
        const item2 = makeItem()

        itemsRepository.create(item1)
        itemsRepository.create(item2)

        const { items } = await sut.execute({})

        expect(items).toHaveLength(2)
    })
})