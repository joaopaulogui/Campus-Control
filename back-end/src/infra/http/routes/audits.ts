import express from "express"
import { VerifyJwt } from "../middlewares/verify-jwt"
import { ListAuditsController } from "../controllers/list-audits-controller"
import { VerifyUserRole } from "../middlewares/verify-user-role"
import { ListRecentActivitiesController } from "../controllers/list-recent-activities-controller"

const router = express.Router()

router.use(VerifyJwt)

const listAuditsController = new ListAuditsController()
const listRecentActivitiesController = new ListRecentActivitiesController()

router.get('/', VerifyUserRole, listAuditsController.handle)

router.get('/recent-activities', listRecentActivitiesController.handle)

export default router