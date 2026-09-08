import express from "express"
import { CreateRoomController } from "../controllers/create-room-controller"
import { ListRoomsController } from "../controllers/list-rooms-controller"
import { ToggleRoomLockController } from "../controllers/toggle-room-lock-controller"
import { VerifyJwt } from "../middlewares/verify-jwt"
import { VerifyUserRole } from "../middlewares/verify-user-role"

const router = express.Router()

const createRoomController = new CreateRoomController()
const listFloorRoomsController = new ListRoomsController()
const toggleRoomLockController = new ToggleRoomLockController()

router.use(VerifyJwt)

router.post('/', VerifyUserRole, createRoomController.handle)

router.get('/', listFloorRoomsController.handle)

router.patch('/:roomId/lock', toggleRoomLockController.handle)

export default router