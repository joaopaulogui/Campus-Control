import express from "express"
import { CreateRoomController } from "../controllers/create-room-controller"
import { ListFloorRoomsController } from "../controllers/list-floor-rooms-controller"
import { ToggleRoomLockController } from "../controllers/toggle-room-lock-controller"

const router = express.Router()

const createRoomController = new CreateRoomController()
const listFloorRoomsController = new ListFloorRoomsController()
const toggleRoomLockController = new ToggleRoomLockController()

router.post('/', (req, res) => createRoomController.handle(req, res))

router.get('/', (req, res) => listFloorRoomsController.handle(req, res))

router.patch('/:roomId/lock', (req, res) => toggleRoomLockController.handle(req, res))

export default router