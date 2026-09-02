import type { Floor } from "../../entities/floor";
import type { FloorFilters, FloorsRepository } from "../../repositories/floors-repository";

export class InMemoryFloorsRepository implements FloorsRepository {
    public items: Floor[] = []
    
    async create(floor: Floor): Promise<void> {
        this.items.push(floor)
    }

    async findById(id: string): Promise<Floor | null> {
        const floor = this.items.find(item => item.id === id)

        if(!floor) {
            return null
        }

        return floor
    }

    async findMany(filters: FloorFilters): Promise<Floor[]> {
        const floors = this.items.filter(item => {
            if(filters?.id && item.id !== filters.id) {
                return false
            }
            return true
        })

        return floors
    }

    async save(floor: Floor): Promise<void> {
        const itemIndex = this.items.findIndex(item => item.id === floor.id)

        this.items[itemIndex] = floor
    }

    async delete(floor: Floor): Promise<void> {
        const itemIndex = this.items.findIndex(item => item.id === floor.id)

        this.items.splice(itemIndex, 1)
    }
}