import { beforeEach, describe, expect, test } from "vitest";
import { InMemoryRoomsRepository } from "@test/repositories/in-memory-rooms-repository";
import { GetRoomDetailsUseCase } from "./get-room-details";
import { makeRoom } from "@test/factories/make-room";
import { makeAirConditioner } from "@test/factories/make-air-conditioner";
import { makeProjector } from "@test/factories/make-projector";
import { InMemoryUsersRepository } from "@/test/repositories/in-memory-users-repository";
import { makeUser } from "@/test/factories/make-user";
import { UserRole } from "../entities/user";

let roomsRepository: InMemoryRoomsRepository
let usersRepository: InMemoryUsersRepository
let sut: GetRoomDetailsUseCase

describe("Get room details", () => {
    beforeEach(() => {
        roomsRepository = new InMemoryRoomsRepository()
        usersRepository = new InMemoryUsersRepository()
        sut = new GetRoomDetailsUseCase( roomsRepository, usersRepository )
    })

    test("It should be able to get the details of a room", async () => {
        const user = makeUser({ role: UserRole.ADMIN })

        usersRepository.create(user)
        
        const room = makeRoom()

        roomsRepository.create(room)
        
        const roomDetails = await sut.execute({ userId: user.id, roomId: room.id })

        expect(roomDetails.room).toEqual(expect.objectContaining({ id: room.id }))
    })
})