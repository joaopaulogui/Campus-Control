import type { Building } from "../../entities/building";
import type { BuildingFilters, BuildingsRepository } from "../../repositories/buildings-repository";

export class InMemoryBuildingsRepository implements BuildingsRepository {
    public items: Building[] = []
    
    async create(building: Building): Promise<void> {
        this.items.push(building)
    }

    async findById(id: string): Promise<Building | null> {
        const building = this.items.find(item => item.id === id)

        if(!building) {
            return null
        }

        return building
    }

    async findMany(filters?: BuildingFilters): Promise<Building[]> {
        const buildings = this.items.filter(item => {
            if(filters?.id && item.id !== filters.id) {
                return false
            }
            return true
        })

        return buildings
    }

    async save(building: Building): Promise<void> {
        const itemIndex = this.items.findIndex(item => item.id === building.id)

        this.items[itemIndex] = building
    }

    async delete(building: Building): Promise<void> {
        const itemIndex = this.items.findIndex(item => item.id === building.id)

        this.items.splice(itemIndex, 1)
    }
}