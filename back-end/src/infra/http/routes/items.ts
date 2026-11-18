import express from "express"
import { RegisterItemController } from "../controllers/register-item-controller"
import { VerifyJwt } from "../middlewares/verify-jwt"
import { DeleteItemController } from "../controllers/delete-item-controller"
import { ListItemsController } from "../controllers/list-items-controller"
import { SelectItemsController } from "../controllers/select-items-controller"
import { GetItemByIdController } from "../controllers/get-item-by-id-controller"

const router = express.Router()

const registerItemController = new RegisterItemController()
const getItemByIdControlle = new GetItemByIdController()
const listItemsController = new ListItemsController()
const selectItemsController = new SelectItemsController()
const deleteItemController = new DeleteItemController()

router.use(VerifyJwt)

router.get('/', listItemsController.handle)

router.get('/select', selectItemsController.handle)

router.post('/', registerItemController.handle)

router.get('/:itemId', getItemByIdControlle.handle)

router.delete('/:itemId', deleteItemController.handle)

export default router