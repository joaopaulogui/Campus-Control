import type { Room } from "@domain/entities/room";
import type { PaginationParams } from "@core/repositories/pagination-params";
import type { RoomFilters, RoomsRepository } from "@domain/repositories/rooms-repository";
import type { RoomContext } from "@/domain/entities/value-objects/room-context";

export class InMemoryRoomsRepository implements RoomsRepository {
    public items: Room[] = []

    async create(room: Room): Promise<void> {
        this.items.push(room)
    }

    async findById(id: string): Promise<Room | null> {
        const room = this.items.find(item => item.id === id)

        if(!room) {
            return null
        }

        return room
    }

    async findByIdWithContext(id: string): Promise<RoomContext | null> {
        const room = this.items.find(item => item.id === id)

        if(!room) {
            return null
        }

        return {
            id: room.id,
            name: room.name,
            type: room.type,
            capacity: room.capacity,
            isLocked: room.isLocked,
            updatedAt: room.updatedAt ?? null,
            floorId: room.floorId,
            floorName: "",
            buildingId: "",
            buildingName: "",
            airConditioners: [],
            projectors: []
        }
    }

    async findMany(filters: RoomFilters): Promise<Room[]> {
        const rooms = this.items.filter(item => {
            if(filters?.floorIds && !filters.floorIds.includes(item.floorId)) {
                return false
            }
            if(filters.name && !item.name.includes(filters.name)) {
                return false
            }
            return true
        })

        return rooms
    }

    async findManyPaginated(filters: RoomFilters, params: PaginationParams = { page: 1, perPage: 30 }): Promise<Room[]> {
        const rooms = this.items.filter(item => {
            if(filters?.floorIds && !filters.floorIds.includes(item.floorId)) {
                return false
            }
            if(filters?.name && !item.name.includes(filters.name)) {
                return false
            }
            if(filters?.type && item.type !== filters.type) {
                return false
            }
            if(filters?.isLocked && item.isLocked !== filters.isLocked) {
                return false
            }
            return true
        }).splice((params.page - 1) * params.perPage, params.page * params.perPage)

        return rooms
    }

    async findManyWithContext(filters: RoomFilters): Promise<RoomContext[]> {
        const rooms = this.items.filter(item => {
            if(filters?.floorIds && !filters.floorIds.includes(item.floorId)) {
                return false
            }
            if(filters.name && !item.name.includes(filters.name)) {
                return false
            }
            return true
        })

        return rooms.map(room => ({
            id: room.id,
            name: room.name,
            type: room.type,
            capacity: room.capacity,
            isLocked: room.isLocked,
            updatedAt: room.updatedAt ?? null,
            floorId: room.floorId,
            floorName: "",
            buildingId: "",
            buildingName: "",
            airConditioners: [],
            projectors: []
        }))
    }

    async findManyWithContextPaginated(filters: RoomFilters, params: PaginationParams = { page: 1, perPage: 30 }): Promise<RoomContext[]> {
        const rooms = this.items.filter(item => {
            if(filters?.floorIds && !filters.floorIds.includes(item.floorId)) {
                return false
            }
            if(filters?.name && !item.name.includes(filters.name)) {
                return false
            }
            if(filters?.type && item.type !== filters.type) {
                return false
            }
            if(filters?.isLocked && item.isLocked !== filters.isLocked) {
                return false
            }
            return true
        }).splice((params.page - 1) * params.perPage, params.page * params.perPage)

        return rooms.map(room => ({
            id: room.id,
            name: room.name,
            type: room.type,
            capacity: room.capacity,
            isLocked: room.isLocked,
            updatedAt: room.updatedAt ?? null,
            floorId: room.floorId,
            floorName: "",
            buildingId: "",
            buildingName: "",
            airConditioners: [],
            projectors: []
        }))
    }

    async save(room: Room): Promise<void> {
        const itemIndex = this.items.findIndex(item => item.id === room.id)

        this.items[itemIndex] = room
    }

    async delete(room: Room): Promise<void> {
        const itemIndex = this.items.findIndex(item => item.id === room.id)

        this.items.splice(itemIndex, 1)
    }
}