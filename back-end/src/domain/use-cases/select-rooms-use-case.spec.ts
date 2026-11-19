import { describe, test, beforeEach, expect } from "vitest";
import { InMemoryRoomsRepository } from "@test/repositories/in-memory-rooms-repository";
import { SelectRoomsUseCase } from "./select-rooms-use-case";
import { makeRoom } from "@test/factories/make-room";
import { InMemoryUsersRepository } from "@/test/repositories/in-memory-users-repository";
import { makeUser } from "@/test/factories/make-user";
import { UserRole } from "../entities/user";

let roomsRepository: InMemoryRoomsRepository
let usersRepository: InMemoryUsersRepository
let sut: SelectRoomsUseCase

describe('Select Floors', () => {
    beforeEach(() => {
        roomsRepository = new InMemoryRoomsRepository()
        usersRepository = new InMemoryUsersRepository()
        sut = new SelectRoomsUseCase(roomsRepository, usersRepository)
    })

    test('It should be able to select all rooms', async () => {
        const user = makeUser({ role: UserRole.ADMIN })

        usersRepository.create(user)

        const room1 = makeRoom()        
        const room2 = makeRoom()        
        roomsRepository.create(room1)
        roomsRepository.create(room2)

        const { rooms } = await sut.execute({ userId: user.id })

        expect(rooms).toHaveLength(2)
        expect(rooms).toEqual(expect.arrayContaining([
            expect.objectContaining({ id: room1.id }),
            expect.objectContaining({ id: room2.id }),
        ]))
    })
})