import express from "express"
import { RegisterUserController } from "../controllers/register-user-controller"
import { AuthenticateUserController } from "../controllers/authenticate-user-controller"
import { VerifyUserRole } from "../middlewares/verify-user-role"
import { VerifyJwt } from "../middlewares/verify-jwt"

const router = express.Router()

const registerUserController = new RegisterUserController()
const authenticateUserController = new AuthenticateUserController()

router.post('/', VerifyJwt, VerifyUserRole, registerUserController.handle)

router.post('/login', authenticateUserController.handle)

export default router