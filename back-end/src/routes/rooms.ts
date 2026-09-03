import express from "express"
import { CreateRoomController } from "../controllers/create-room-controller"
import { ListFloorRoomsController } from "../controllers/list-floor-rooms-controller"

const router = express.Router()

const createRoomController = new CreateRoomController()
const listFloorRoomsController = new ListFloorRoomsController()

router.post('/', (req, res) => createRoomController.handle(req, res))

router.get('/', (req, res) => listFloorRoomsController.handle(req, res))

export default router