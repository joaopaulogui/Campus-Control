import { faker } from "@faker-js/faker";
import { Item, ItemType, type ItemProps } from "../../entities/item";

export function makeItem(override: Partial<ItemProps> = {}, id?: string): Item {
    return new Item({
        name: faker.commerce.productName(),
        type: faker.helpers.enumValue(ItemType),
        totalQuantity: faker.number.int({ min:1, max:30 }),
        onHoldQuantity: faker.number.int({ min:1, max:10 }),
        availableQuantity: faker.number.int({ min:1, max:30 }),
        ...override
    }, id)
}