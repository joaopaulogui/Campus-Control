import express from "express";
import { CreateBuildingController } from "../controllers/create-building-controller";
import { ListBuildingsController } from "../controllers/list-buildings-controller";
import { VerifyJwt } from "../middlewares/verify-jwt";
import { VerifyUserRole } from "../middlewares/verify-user-role";

const router = express.Router()

const createBuildingController = new CreateBuildingController()
const listBuildingsController = new ListBuildingsController()

router.use(VerifyJwt)

router.get('/', listBuildingsController.handle)

router.post('/', VerifyUserRole, createBuildingController.handle)

export default router