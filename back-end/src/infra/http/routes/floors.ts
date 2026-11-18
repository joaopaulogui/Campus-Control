import express from "express"
import { RegisterFloorController } from "../controllers/register-floor-controller"
import { ListFloorsController } from "../controllers/list-floors-controller"
import { VerifyJwt } from "../middlewares/verify-jwt"
import { VerifyUserRole } from "../middlewares/verify-user-role"
import { DeleteFloorController } from "../controllers/delete-floor-controller"
import { UpdateFloorController } from "../controllers/update-floor-controller"
import { SelectFloorsController } from "../controllers/select-floors-controller"
import { GetFloorByIdController } from "../controllers/get-floor-by-id-controller"

const router = express.Router()

const getFloorByIdController = new GetFloorByIdController()
const listFloorsController = new ListFloorsController()
const selectFloorsController = new SelectFloorsController()
const registerFloorController = new RegisterFloorController()
const deleteFloorController = new DeleteFloorController()
const updateFloorController = new UpdateFloorController()

router.use(VerifyJwt)

router.get('/', listFloorsController.handle)

router.get('/select', selectFloorsController.handle)

router.post('/', VerifyUserRole, registerFloorController.handle)

router.get('/:floorId', getFloorByIdController.handle)

router.patch('/:floorId', VerifyUserRole, updateFloorController.handle)

router.delete('/:floorId', VerifyUserRole, deleteFloorController.handle)

export default router