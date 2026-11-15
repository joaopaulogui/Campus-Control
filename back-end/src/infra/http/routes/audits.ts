import express from "express"
import { VerifyJwt } from "../middlewares/verify-jwt"
import { ListAuditsController } from "../controllers/list-audits-controller"
import { VerifyUserRole } from "../middlewares/verify-user-role"

const router = express.Router()

router.use(VerifyJwt)

const listAuditsController = new ListAuditsController()

router.get('/', VerifyUserRole, listAuditsController.handle)

export default router