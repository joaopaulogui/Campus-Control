import { InMemoryAuditsRepository } from "@/test/repositories/in-memory-audits-repository";
import { ListAuditsUseCase } from "./list-audits-use-case";
import { makeAudit } from "@/test/factories/make-audit";

let auditsRepository: InMemoryAuditsRepository
let sut: ListAuditsUseCase

describe('List audits', () => {
    beforeEach(() => {
        auditsRepository = new InMemoryAuditsRepository()
        sut = new ListAuditsUseCase(auditsRepository)
    })

    test('It should be able to list audits', async () => {
        auditsRepository.create(makeAudit())
        auditsRepository.create(makeAudit())

        const { audits } = await sut.execute({})

        expect(audits).toHaveLength(2)
    })
})