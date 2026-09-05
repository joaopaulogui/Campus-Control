import express from "express"
import { CreateFloorController } from "../controllers/create-floor-controller"
import { ListAllFloorsController } from "../controllers/list-all-floors-controller"

const router = express.Router()

const listAllFloorsController = new ListAllFloorsController()
const createFloorController = new CreateFloorController()

router.get('/', (req, res) => listAllFloorsController.handle(req, res))

router.post('/', (req, res) => createFloorController.handle(req, res))

export default router