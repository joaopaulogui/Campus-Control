import { describe, test, beforeEach, expect } from "vitest";
import { InMemoryRoomsRepository } from "@test/repositories/in-memory-rooms-repository";
import { ListRoomsUseCase } from "./list-rooms-use-case";
import { makeFloor } from "@test/factories/make-floor";
import { makeRoom } from "@test/factories/make-room";
import { makeBuilding } from "@test/factories/make-building";
import { InMemoryUsersRepository } from "@/test/repositories/in-memory-users-repository";
import { makeUser } from "@/test/factories/make-user";
import { UserRole } from "../entities/user";

let roomsRepository: InMemoryRoomsRepository
let usersRepository: InMemoryUsersRepository
let sut: ListRoomsUseCase

describe('List Floors', () => {
    beforeEach(() => {
        roomsRepository = new InMemoryRoomsRepository()
        usersRepository = new InMemoryUsersRepository()
        sut = new ListRoomsUseCase(roomsRepository, usersRepository)
    })

    test('It should be able to list all rooms', async () => {
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