import express from "express"
import { RegisterUserController } from "../controllers/register-user-controller"
import { AuthenticateUserController } from "../controllers/authenticate-user-controller"
import { VerifyUserRole } from "../middlewares/verify-user-role"
import { VerifyJwt } from "../middlewares/verify-jwt"
import { GetUserProfileController } from "../controllers/get-user-profile-controller"
import { UpdateUserController } from "../controllers/update-user-controller"
import { GetUserByIdController } from "../controllers/get-user-by-id-controller"
import { SelectUsersController } from "../controllers/select-users-controller"
import { DeleteUserController } from "../controllers/delete-user-controller"

const router = express.Router()

const registerUserController = new RegisterUserController()
const authenticateUserController = new AuthenticateUserController()
const getUserByIdController = new GetUserByIdController()
const getUserProfileController = new GetUserProfileController()
const selectUsersController = new SelectUsersController()
const updateUserController = new UpdateUserController()
const deleteUserController = new DeleteUserController()

router.post('/', VerifyJwt, VerifyUserRole, registerUserController.handle)

router.post('/login', authenticateUserController.handle)

router.get('/me', VerifyJwt, getUserProfileController.handle)

router.get('/select', VerifyJwt, VerifyUserRole, selectUsersController.handle)

router.get('/:userId', VerifyJwt, VerifyUserRole, getUserByIdController.handle)

router.patch('/:userId', VerifyJwt, VerifyUserRole, updateUserController.handle)

router.delete('/:userId', VerifyJwt, VerifyUserRole, deleteUserController.handle)

export default router