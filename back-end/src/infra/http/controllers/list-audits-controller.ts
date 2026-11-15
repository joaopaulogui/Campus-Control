import { type Request, type Response } from "express";
import { PrismaAuditsRepository } from "../../prisma/repositories/prisma-audits-repository";
import { ListAuditsUseCase } from "@domain/use-cases/list-audits-use-case";
import { AuditPresenter } from "../presenters/audit-presenter";
import { listAuditsQuerySchema } from "../schemas/audits";

export class ListAuditsController {
    async handle(req: Request, res: Response) {
        const auditsRepository = new PrismaAuditsRepository()

        const listAudits = new ListAuditsUseCase(auditsRepository)

        const { userId, eventType, eventEntity, entityId, description, page, perPage } = listAuditsQuerySchema.parse(req.query)

        const { audits } = await listAudits.execute({ userId, eventType, eventEntity, entityId, description, page, perPage })

        res.status(200).json(audits.map(AuditPresenter.toHttp))
    }
}