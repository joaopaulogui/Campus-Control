import express from "express";
import { CreateAirConditionerController } from "../controllers/create-air-conditioner-controller";
import { ListAirConditionersController } from "../controllers/list-air-conditioners-controller";
import { ToggleAirConditionerController } from "../controllers/toggle-air-conditioner-controller";
import { VerifyJwt } from "../middlewares/verify-jwt";
import { VerifyUserRole } from "../middlewares/verify-user-role";

const router = express.Router()

const createAirConditionerController = new CreateAirConditionerController()
const listAirConditionersController = new ListAirConditionersController()
const toggleAirConditionerController = new ToggleAirConditionerController()

router.use(VerifyJwt)

router.post('/', VerifyUserRole, createAirConditionerController.handle)

router.get('/', listAirConditionersController.handle)

router.patch('/:airConditionerId/toggle', toggleAirConditionerController.handle)

export default router