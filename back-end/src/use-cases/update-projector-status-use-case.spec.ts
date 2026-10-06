import { beforeEach, describe, expect, test } from "vitest";
import { InMemoryProjectorsRepository } from "../test/repositories/in-memory-projectors-repository";
import { UpdateProjectorStatusUseCase } from "./update-projector-status-use-case";
import { makeProjector } from "../test/factories/make-projector";
import { ProjectorStatus } from "../entities/projector";

let projectorsRepository: InMemoryProjectorsRepository
let sut: UpdateProjectorStatusUseCase

describe("Update projector", () => {
    beforeEach(() => {
        projectorsRepository = new InMemoryProjectorsRepository()
        sut = new UpdateProjectorStatusUseCase(projectorsRepository)
    })

    test("It should be able to update a projector", async () => {
        const projector = makeProjector({ status: ProjectorStatus.WORKING })

        projectorsRepository.create(projector)

        await sut.execute({ projectorId: projector.id, status: ProjectorStatus.BROKEN })

        expect(projectorsRepository.items[0]).toEqual(expect.objectContaining({ status: ProjectorStatus.BROKEN }))
    })
})