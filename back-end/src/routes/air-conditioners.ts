import express from "express";
import { CreateAirConditionerController } from "../controllers/create-air-conditioner-controller";
import { ListAirConditionersController } from "../controllers/list-air-conditioners-controller";

const router = express.Router()

const createAirConditionerController = new CreateAirConditionerController()
const listAirConditionersController = new ListAirConditionersController()

router.post('/', (req, res) => createAirConditionerController.handle(req, res))

router.get('/', (req, res) => listAirConditionersController.handle(req, res))

export default router