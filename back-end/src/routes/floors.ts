import express from "express"
import { ListFloorRoomsController } from "../controllers/list-floor-rooms-controller"

const router = express.Router()

const listFloorRoomsController = new ListFloorRoomsController()

router.get('/', (req, res) => listFloorRoomsController.handle(req, res))

export default router