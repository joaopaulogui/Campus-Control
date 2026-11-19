import express from "express";
import { RegisterBuildingController } from "../controllers/register-building-controller";
import { ListBuildingsController } from "../controllers/list-buildings-controller";
import { VerifyJwt } from "../middlewares/verify-jwt";
import { VerifyUserRole } from "../middlewares/verify-user-role";
import { DeleteBuildingController } from "../controllers/delete-building-controller";
import { UpdateBuildingController } from "../controllers/update-building-controller";
import { SelectBuildingsController } from "../controllers/select-buildings-controller";
import { GetBuildingByIdController } from "../controllers/get-building-by-id-controller";

const router = express.Router()

const registerBuildingController = new RegisterBuildingController()
const getBuildingByIdController = new GetBuildingByIdController()
const listBuildingsController = new ListBuildingsController()
const selectBuildingController = new SelectBuildingsController()
const updateBuildingController = new UpdateBuildingController()
const deleteBuildingController = new DeleteBuildingController()

router.use(VerifyJwt)

router.get('/', listBuildingsController.handle)

router.get('/select', selectBuildingController.handle)

router.post('/', VerifyUserRole, registerBuildingController.handle)

router.get('/:buildingId', getBuildingByIdController.handle)

router.patch('/:buildingId', VerifyUserRole, updateBuildingController.handle)

router.delete('/:buildingId', VerifyUserRole, deleteBuildingController.handle)

export default router