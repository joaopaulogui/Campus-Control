import express from "express";
import { CreateAirConditionerController } from "../controllers/create-air-conditioner-controller";
import { ListAirConditionersController } from "../controllers/list-air-conditioners-controller";
import { ToggleAirConditionerController } from "../controllers/toggle-air-conditioner-controller";

const router = express.Router()

const createAirConditionerController = new CreateAirConditionerController()
const listAirConditionersController = new ListAirConditionersController()
const toggleAirConditionerController = new ToggleAirConditionerController()

router.post('/', (req, res) => createAirConditionerController.handle(req, res))

router.get('/', (req, res) => listAirConditionersController.handle(req, res))

router.patch('/:airConditionerId/toggle', (req, res) => toggleAirConditionerController.handle(req, res))

export default router