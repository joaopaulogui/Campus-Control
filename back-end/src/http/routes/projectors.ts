import express from "express"
import { VerifyJwt } from "../middlewares/verify-jwt"
import { VerifyUserRole } from "../middlewares/verify-user-role"
import { RegisterProjectorController } from "../controllers/register-projector-controller"

const router = express.Router()

const registerProjectorController = new RegisterProjectorController()

router.use(VerifyJwt)

router.post('/', VerifyUserRole, registerProjectorController.handle)

export default router