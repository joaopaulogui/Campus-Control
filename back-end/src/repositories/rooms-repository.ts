import { Room } from "../entities/room";

export interface RoomsRepository {
    create(room: Room): Promise<void>
    findById(id: string): Promise<Room | null>
    findManyByFloorId(floorId: string): Promise<Room[]>
    save(room: Room): Promise<void>
    delete(room: Room): Promise<void>
}