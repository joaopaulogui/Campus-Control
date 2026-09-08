import express from "express"
import { CreateUserController } from "../controllers/create-user-controller"
import { AuthenticateUserController } from "../controllers/authenticate-user-controller"
import { VerifyUserRole } from "../middlewares/verify-user-role"
import { VerifyJwt } from "../middlewares/verify-jwt"

const router = express.Router()

const createUserController = new CreateUserController()
const authenticateUserController = new AuthenticateUserController()

router.post('/', VerifyJwt, VerifyUserRole, createUserController.handle)

router.post('/login', authenticateUserController.handle)

export default router