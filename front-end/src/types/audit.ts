import type z from "zod";
import type { eventEntityTypeSchema, getAuditsQueryParamsSchema } from "@/schemas/audit.schema";

export type EventEntity = z.infer<typeof eventEntityTypeSchema>

export type Audit = {
    id?: string
    userId?: string | null
    eventType: string
    eventEntity: EventEntity
    entityId: string
    description: string
    createdAt: string
    metadata: Record<string, unknown> | unknown
}

export type GetAuditsQueryParamsSchema = z.infer<typeof getAuditsQueryParamsSchema>
