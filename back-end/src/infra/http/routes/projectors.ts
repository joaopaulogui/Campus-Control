import express from "express"
import { VerifyJwt } from "../middlewares/verify-jwt"
import { VerifyUserRole } from "../middlewares/verify-user-role"
import { RegisterProjectorController } from "../controllers/register-projector-controller"
import { DeleteProjectorController } from "../controllers/delete-projector-controller"
import { UpdateProjectorStatusController } from "../controllers/update-projector-status-controller"

const router = express.Router()

const registerProjectorController = new RegisterProjectorController()
const updateProjectorStatusController = new UpdateProjectorStatusController()
const deleteProjectorController = new DeleteProjectorController()

router.use(VerifyJwt)

router.post('/', VerifyUserRole, registerProjectorController.handle)

router.patch('/:projectorId/status', updateProjectorStatusController.handle)

router.delete('/:projectorId', VerifyUserRole, deleteProjectorController.handle)

export default router