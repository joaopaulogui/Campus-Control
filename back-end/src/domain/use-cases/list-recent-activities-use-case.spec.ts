import { InMemoryAuditsRepository } from "@/test/repositories/in-memory-audits-repository";
import { ListRecentActivitiesUseCase } from "./list-recent-activities-use-case";
import { makeAudit } from "@/test/factories/make-audit";
import { EntityType } from "../entities/audit";

let auditsRepository: InMemoryAuditsRepository
let sut: ListRecentActivitiesUseCase

describe('List recent activities', () => {
    beforeEach(() => {
        auditsRepository = new InMemoryAuditsRepository()
        sut = new ListRecentActivitiesUseCase(auditsRepository)
    })

    test('It should be able to list recent activities', async () => {
        auditsRepository.create(makeAudit({ eventEntity: EntityType.BUILDING }))
        auditsRepository.create(makeAudit({ eventEntity: EntityType.LOAN }))

        const { audits } = await sut.execute({})

        expect(audits).toHaveLength(1)
    })
})