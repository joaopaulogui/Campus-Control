import express from "express"
import { CreateFloorController } from "../controllers/create-floor-controller"
import { ListFloorsController } from "../controllers/list-floors-controller"

const router = express.Router()

const listFloorsController = new ListFloorsController()
const createFloorController = new CreateFloorController()

router.get('/', (req, res) => listFloorsController.handle(req, res))

router.post('/', (req, res) => createFloorController.handle(req, res))

export default router