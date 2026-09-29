import express from "express"
import { RegisterItemController } from "../controllers/register-item-controller"
import { VerifyJwt } from "../middlewares/verify-jwt"
import { DeleteItemController } from "../controllers/delete-item-controller"
import { ListItemsController } from "../controllers/list-items-controller"

const router = express.Router()

const registerItemController = new RegisterItemController()
const listItemsController = new ListItemsController()
const deleteItemController = new DeleteItemController()

router.use(VerifyJwt)

router.get('/', listItemsController.handle)

router.post('/', registerItemController.handle)

router.delete('/:itemId', deleteItemController.handle)

export default router