import { beforeEach, describe, expect, test } from "vitest";
import { InMemoryAuditsRepository } from "../test/repositories/in-memory-audits-repository";
import { CreateAuditUseCase } from "./create-audit-use-case";
import { makeUser } from "../test/factories/make-user";
import { EntityType } from "../entities/audit";
import { makeBuilding } from "../test/factories/make-building";

let auditsRepository: InMemoryAuditsRepository
let sut: CreateAuditUseCase

describe("Create audit", () => {
    beforeEach(() => {
        auditsRepository = new InMemoryAuditsRepository()
        sut = new CreateAuditUseCase(auditsRepository)
    })

    test("It should be able to create an audit", async () => {
        const user = makeUser()
        
        const building = makeBuilding()

        await sut.execute({
            userId: user.id,
            eventType: "test.event",
            eventEntity: EntityType.BUILDING,
            entityId: building.id,
            description: "It is just a test event",
            metadata: {}
        })

        expect(auditsRepository.items).toHaveLength(1)
        expect(auditsRepository.items[0]).toEqual(expect.objectContaining({ userId: user.id }))
    })
})