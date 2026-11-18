import type { Floor } from "@domain/entities/floor";
import type { PaginationParams } from "@core/repositories/pagination-params";
import type { FloorFilters, FloorsRepository } from "@domain/repositories/floors-repository";
import type { FloorWithBuilding } from "@/domain/entities/value-objects/floor-with-building";

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

    async findByIdWithBuilding(id: string): Promise<FloorWithBuilding | null> {
        const floor = this.items.find(item => item.id === id)

        if(!floor) {
            return null
        }

        return {
            id: floor.id,
            name: floor.name,
            buildingId: floor.buildingId,
            buildingName: ""
        }
    }

    async findMany(filters: FloorFilters): Promise<Floor[]> {
        const floors = this.items.filter(item => {
            if(filters?.id && item.id !== filters.id) {
                return false
            }
            if(filters?.buildingIds && !filters.buildingIds.includes(item.buildingId)) {
                return false
            }
            if(filters?.name && !item.name.includes(filters.name)) {
                return false
            }
            return true
        })

        return floors
    }

    async findManyPaginated(filters: FloorFilters, params: PaginationParams = { page: 1, perPage: 30 }): Promise<Floor[]> {
        const floors = this.items.filter(item => {
            if(filters?.id && item.id !== filters.id) {
                return false
            }
            if(filters?.buildingIds && !filters.buildingIds.includes(item.buildingId)) {
                return false
            }
            if(filters?.name && !item.name.includes(filters.name)) {
                return false
            }
            return true
        }).slice((params.page-1) * params.perPage, params.page * params.perPage)

        return floors
    }

    async findManyWithBuilding(filters: FloorFilters): Promise<FloorWithBuilding[]> {
        const floors = this.items.filter(item => {
            if(filters?.id && item.id !== filters.id) {
                return false
            }
            if(filters?.buildingIds && !filters.buildingIds.includes(item.buildingId)) {
                return false
            }
            if(filters?.name && !item.name.includes(filters.name)) {
                return false
            }
            return true
        })

        return floors.map(floor => ({
            id: floor.id,
            name: floor.name,
            buildingId: floor.buildingId,
            buildingName: "",
            updatedAt: floor.updatedAt ?? null
        }))
    }

    async findManyWithBuildingPaginated(filters: FloorFilters, params: PaginationParams = { page: 1, perPage: 30 }): Promise<FloorWithBuilding[]> {
        const floors = this.items.filter(item => {
            if(filters?.id && item.id !== filters.id) {
                return false
            }
            if(filters?.buildingIds && !filters.buildingIds.includes(item.buildingId)) {
                return false
            }
            if(filters?.name && !item.name.includes(filters.name)) {
                return false
            }
            return true
        }).slice((params.page-1) * params.perPage, params.page * params.perPage)

        return floors.map(floor => ({
            id: floor.id,
            name: floor.name,
            buildingId: floor.buildingId,
            buildingName: "",
            updatedAt: floor.updatedAt ?? null
        }))
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