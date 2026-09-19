import express from "express";
import { CreateBuildingController } from "../controllers/create-building-controller";
import { ListBuildingsController } from "../controllers/list-buildings-controller";
import { VerifyJwt } from "../middlewares/verify-jwt";
import { VerifyUserRole } from "../middlewares/verify-user-role";
import { DeleteBuildingController } from "../controllers/delete-building-controller";

const router = express.Router()

const createBuildingController = new CreateBuildingController()
const listBuildingsController = new ListBuildingsController()
const deleteBuildingController = new DeleteBuildingController()

router.use(VerifyJwt)

router.get('/', listBuildingsController.handle)

router.post('/', VerifyUserRole, createBuildingController.handle)

router.delete('/:buildingId', VerifyUserRole, deleteBuildingController.handle)

export default router