import express from "express"
import { RegisterRoomController } from "../controllers/register-room-controller"
import { ListRoomsController } from "../controllers/list-rooms-controller"
import { ToggleRoomLockController } from "../controllers/toggle-room-lock-controller"
import { VerifyJwt } from "../middlewares/verify-jwt"
import { VerifyUserRole } from "../middlewares/verify-user-role"
import { DeleteRoomController } from "../controllers/delete-room-controller"

const router = express.Router()

const registerRoomController = new RegisterRoomController()
const listFloorRoomsController = new ListRoomsController()
const toggleRoomLockController = new ToggleRoomLockController()
const deleteRoomController = new DeleteRoomController()

router.use(VerifyJwt)

router.post('/', VerifyUserRole, registerRoomController.handle)

router.get('/', listFloorRoomsController.handle)

router.patch('/:roomId/lock', toggleRoomLockController.handle)

router.delete('/:roomId', VerifyUserRole, deleteRoomController.handle)

export default router