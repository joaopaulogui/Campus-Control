import express from "express"
import { ListFloorRoomsController } from "../controllers/list-floor-rooms-controller"
import { CreateFloorController } from "../controllers/create-floor-controller"
import { CreateRoomController } from "../controllers/create-room-controller"

const router = express.Router()

const createFloorController = new CreateFloorController()
const createRoomController = new CreateRoomController()
const listFloorRoomsController = new ListFloorRoomsController()

router.get('/', (req, res) => listFloorRoomsController.handle(req, res))

router.get('/:floorId', (req, res) => listFloorRoomsController.handle(req, res))

router.post('/', (req, res) => createFloorController.handle(req, res))

router.post('/:floorId/rooms', (req, res) => createRoomController.handle(req, res))

export default router