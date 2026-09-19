import express from "express";
import { RegisterAirConditionerController } from "../controllers/register-air-conditioner-controller";
import { ListAirConditionersController } from "../controllers/list-air-conditioners-controller";
import { ToggleAirConditionerController } from "../controllers/toggle-air-conditioner-controller";
import { VerifyJwt } from "../middlewares/verify-jwt";
import { VerifyUserRole } from "../middlewares/verify-user-role";
import { DeleteAirConditionerController } from "../controllers/delete-air-conditioner-controller";

const router = express.Router()

const registerAirConditionerController = new RegisterAirConditionerController()
const listAirConditionersController = new ListAirConditionersController()
const toggleAirConditionerController = new ToggleAirConditionerController()
const deleteAirConditioner = new DeleteAirConditionerController()

router.use(VerifyJwt)

router.post('/', VerifyUserRole, registerAirConditionerController.handle)

router.get('/', listAirConditionersController.handle)

router.patch('/:airConditionerId/toggle', toggleAirConditionerController.handle)

router.delete('/:airConditionerId', VerifyUserRole, deleteAirConditioner.handle)

export default router