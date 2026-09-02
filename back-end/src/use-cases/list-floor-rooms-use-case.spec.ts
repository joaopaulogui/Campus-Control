import { describe, test, beforeEach, expect } from "vitest";
import { InMemoryFloorsRepository } from "../test/repositories/in-memory-floors-repository";
import { InMemoryRoomsRepository } from "../test/repositories/in-memory-rooms-repository";
import { ListFloorRoomsUseCase } from "./list-floor-rooms-use-case";
import { Floor } from "../entities/floor";
import { Room, RoomType } from "../entities/room";
import { makeFloor } from "../test/factories/make-floor";
import { makeRoom } from "../test/factories/make-room";

let floorsRepository: InMemoryFloorsRepository
let roomsRepository: InMemoryRoomsRepository
let sut: ListFloorRoomsUseCase

describe('List Floors', () => {
    beforeEach(() => {
        floorsRepository = new InMemoryFloorsRepository()
        roomsRepository = new InMemoryRoomsRepository()
        sut = new ListFloorRoomsUseCase(floorsRepository, roomsRepository)
    })

    test('It should be able to list all floors', async () => {
        const floor = makeFloor()
        
        floorsRepository.create(floor)
        floorsRepository.create(makeFloor())


        const room = makeRoom({ floorId: floor.id })
        
        roomsRepository.create(room)

        const result = await sut.execute({})

        expect(result.floors).toHaveLength(2)
        expect(result.floors).toEqual(expect.arrayContaining([
            expect.objectContaining({ 
                rooms: [
                    expect.objectContaining({ name: room.name })
                ]
            })
        ]))
    })

    test('It should be able to list all rooms from a specified floor', async () => {
        const floor1 = makeFloor()
        const floor2 = makeFloor()

        floorsRepository.create(floor1)
        floorsRepository.create(floor2)


        const room1 = makeRoom({ floorId: floor1.id })
        const room2 = makeRoom({ floorId: floor1.id })
        const room3 = makeRoom({ floorId: floor2.id })

        roomsRepository.create(room1)
        roomsRepository.create(room2)
        roomsRepository.create(room3)

        const result = await sut.execute({ floorId: floor1.id })

        expect(result.floors).toHaveLength(1)
        expect(result.floors).toEqual(expect.arrayContaining([
            expect.objectContaining({ 
                rooms: [
                    expect.objectContaining({ name: room1.name }),
                    expect.objectContaining({ name: room2.name }),
                ]
            })
        ]))
    })
})