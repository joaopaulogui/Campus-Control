import express from "express"
import { CreateUserController } from "../controllers/create-user-controller"

const router = express.Router()

const createUserController = new CreateUserController()

router.post('/', (req, res) => createUserController.handle(req, res))

export default router