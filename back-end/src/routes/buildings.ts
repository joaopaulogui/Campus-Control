import express from "express";
import { CreateBuildingController } from "../controllers/create-building-controller";
import { ListBuildingsController } from "../controllers/list-buildings-controller";

const router = express.Router()

const createBuildingController = new CreateBuildingController()
const listBuildingsController = new ListBuildingsController()

router.get('/', (req, res) => listBuildingsController.handle(req, res))

router.post('/', (req, res) => createBuildingController.handle(req, res))

export default router