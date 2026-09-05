import type { Room } from "../../entities/room";
import type { RoomFilters, RoomsRepository } from "../../repositories/rooms-repository";

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

    async findMany(filters: RoomFilters): Promise<Room[]> {
        const rooms = this.items.filter(item => {
            if(filters?.floorId && item.floorId !== filters.floorId) {
                return false
            }
            return true
        })

        return rooms
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