import { type Request, type Response } from "express";
import { PrismaAuditsRepository } from "../../prisma/repositories/prisma-audits-repository";
import { ListRecentActivitiesUseCase } from "@domain/use-cases/list-recent-activities-use-case";
import { AuditPresenter } from "../presenters/audit-presenter";
import { listRecentActivitiesQuerySchema } from "../schemas/audits";

export class ListRecentActivitiesController {
    async handle(req: Request, res: Response) {
        const auditsRepository = new PrismaAuditsRepository()

        const listRecentActivities = new ListRecentActivitiesUseCase(auditsRepository)

        const { page, perPage } = listRecentActivitiesQuerySchema.parse(req.query)

        const { audits } = await listRecentActivities.execute({ page, perPage })

        res.status(200).json(audits.map(AuditPresenter.toHttp))
    }
}