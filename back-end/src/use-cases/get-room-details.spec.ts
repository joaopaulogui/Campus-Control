import { beforeEach, describe, expect, test } from "vitest";
import { InMemoryAirConditionersRepository } from "../test/repositories/in-memory-air-conditioners-repository";
import { InMemoryProjectorsRepository } from "../test/repositories/in-memory-projectors-repository";
import { InMemoryRoomsRepository } from "../test/repositories/in-memory-rooms-repository";
import { GetRoomDetailsUseCase } from "./get-room-details";
import { makeRoom } from "../test/factories/make-room";
import { makeAirConditioner } from "../test/factories/make-air-conditioner";
import { makeProjector } from "../test/factories/make-projector";

let roomsRepository: InMemoryRoomsRepository
let airConditionersRepository: InMemoryAirConditionersRepository
let projectorsRepository: InMemoryProjectorsRepository
let sut: GetRoomDetailsUseCase

describe("Get room details", () => {
    beforeEach(() => {
        roomsRepository = new InMemoryRoomsRepository()
        airConditionersRepository = new InMemoryAirConditionersRepository()
        projectorsRepository = new InMemoryProjectorsRepository() 
        sut = new GetRoomDetailsUseCase(
            roomsRepository,
            airConditionersRepository,
            projectorsRepository
        )
    })

    test("It should be able to get the details of a room", async () => {
        const room = makeRoom()

        roomsRepository.create(room)

        const airConditioner1 = makeAirConditioner({ roomId: room.id })
        const airConditioner2 = makeAirConditioner({ roomId: room.id })

        airConditionersRepository.create(airConditioner1)
        airConditionersRepository.create(airConditioner2)

        const projector = makeProjector({ roomId: room.id })

        projectorsRepository.create(projector)

        const roomDetails = await sut.execute({ roomId: room.id })

        expect(roomDetails.room).toEqual(expect.objectContaining({ id: room.id }))
        expect(roomDetails.airConditioners).toHaveLength(2)
        expect(roomDetails.projectors).toHaveLength(1)
    })
})