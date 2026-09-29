import express from "express"
import { RegisterItemController } from "../controllers/register-item-controller"
import { VerifyJwt } from "../middlewares/verify-jwt"
import { DeleteItemController } from "../controllers/delete-item-controller"

const router = express.Router()

const registerItemController = new RegisterItemController()
const deleteItemController = new DeleteItemController()

router.use(VerifyJwt)

router.post('/', registerItemController.handle)

router.delete('/:itemId', deleteItemController.handle)

export default router