import { Projector, ProjectorStatus } from "../entities/projector";

export interface ProjectorFilters {
    roomIds?: string[] | undefined,
    status?: ProjectorStatus | undefined,
}

export interface ProjectorsRepository {
    create(projector: Projector): Promise<void>
    findById(id: string): Promise<Projector | null>
    findMany(filters: ProjectorFilters): Promise<Projector[]>
    save(projector: Projector): Promise<void>
    delete(projector: Projector): Promise<void>
}