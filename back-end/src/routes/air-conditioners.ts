import express from "express";
import { CreateAirConditionerController } from "../controllers/create-air-conditioner-controller";

const router = express.Router()

const createAirConditionerController = new CreateAirConditionerController()

router.post('/', (req, res) => createAirConditionerController.handle(req, res))

export default router