import { InMemoryItemsRepository } from "@/test/repositories/in-memory-items-repository";
import { GetItemByIdUseCase } from "./get-item-by-id-use-case";
import { makeItem } from "@/test/factories/make-item";

let itemsRepository: InMemoryItemsRepository
let sut: GetItemByIdUseCase

describe('Get item by id', () => {
    beforeEach(() => {
        itemsRepository = new InMemoryItemsRepository()
        sut = new GetItemByIdUseCase(itemsRepository)
    })

    test("It should be able to get a item's information by its id", async () => {
        const testItem = makeItem()

        itemsRepository.create(testItem)

        const { item } = await sut.execute({ itemId: testItem.id })

        expect(item).toEqual(expect.objectContaining({ name: testItem.name }))
    })
})