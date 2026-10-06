import { beforeEach, describe, expect, test } from "vitest";
import { InMemoryProjectorsRepository } from "../test/repositories/in-memory-projectors-repository";
import { DeleteProjectorUseCase } from "./delete-projector-use-case";
import { makeProjector } from "../test/factories/make-projector";

let projectorsRepository: InMemoryProjectorsRepository
let sut: DeleteProjectorUseCase

describe("Delete projector", () => {
    beforeEach(() => {
        projectorsRepository = new InMemoryProjectorsRepository()
        sut = new DeleteProjectorUseCase(projectorsRepository)
    })
    
    test("It should be able to delete a projector", async () => {
        const projector = makeProjector()

        projectorsRepository.create(projector)

        expect(projectorsRepository.items).toHaveLength(1)
        
        await sut.execute({ projectorId: projector.id })
        
        expect(projectorsRepository.items).toHaveLength(0)
    })
})