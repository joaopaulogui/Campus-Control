import express from "express"
import { CreateFloorController } from "../controllers/create-floor-controller"

const router = express.Router()

const createFloorController = new CreateFloorController()

router.post('/', (req, res) => createFloorController.handle(req, res))

export default router