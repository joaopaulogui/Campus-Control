import express from "express";
import { CreateBuildingController } from "../controllers/create-building-controller";

const router = express.Router()

const createBuildingController = new CreateBuildingController()

router.post('/', (req, res) => createBuildingController.handle(req, res))

export default router