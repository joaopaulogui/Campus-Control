import type { ProjectorProps } from "../projector";

export type ProjectorWithRoom = Readonly<ProjectorProps & {
    id: string,
    roomName: string,
}>