import express from "express"
import { RegisterUserController } from "../controllers/register-user-controller"
import { AuthenticateUserController } from "../controllers/authenticate-user-controller"
import { VerifyUserRole } from "../middlewares/verify-user-role"
import { VerifyJwt } from "../middlewares/verify-jwt"
import { GetUserProfileController } from "../controllers/get-user-profile-controller"

const router = express.Router()

const registerUserController = new RegisterUserController()
const authenticateUserController = new AuthenticateUserController()
const getUserProfileController = new GetUserProfileController()

router.post('/', VerifyJwt, VerifyUserRole, registerUserController.handle)

router.post('/login', authenticateUserController.handle)

router.get('/me', VerifyJwt, getUserProfileController.handle)

export default router