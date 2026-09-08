import express from "express"
import { CreateFloorController } from "../controllers/create-floor-controller"
import { ListFloorsController } from "../controllers/list-floors-controller"
import { VerifyJwt } from "../middlewares/verify-jwt"
import { VerifyUserRole } from "../middlewares/verify-user-role"

const router = express.Router()

const listFloorsController = new ListFloorsController()
const createFloorController = new CreateFloorController()

router.use(VerifyJwt)

router.get('/', listFloorsController.handle)

router.post('/', VerifyUserRole, createFloorController.handle)

export default router