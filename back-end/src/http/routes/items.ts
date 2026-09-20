import express from "express"
import { RegisterItemController } from "../controllers/register-item-controller"
import { VerifyJwt } from "../middlewares/verify-jwt"

const router = express.Router()

const registerItemController = new RegisterItemController()

router.use(VerifyJwt)

router.post('/', registerItemController.handle)

export default router