import type { Item } from "../../entities/item";

export class ItemPresenter {
    static toHTTP(item: Item) {
        return {
            id: item.id,
            name: item.name,
            type: item.type,
            totalQuantity: item.totalQuantity,
            availableQuantity: item.availableQuantity,
            onHoldQuantity: item.onHoldQuantity,
        }
    }
}