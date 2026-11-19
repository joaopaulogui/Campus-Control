import express from "express"
import { VerifyJwt } from "../middlewares/verify-jwt"
import { LoanItemController } from "../controllers/loan-item-controller"
import { ReturnItemController } from "../controllers/return-item-controller"
import { ListLoansController } from "../controllers/list-loans-controller"
import { SelectLoansController } from "../controllers/select-loans-controller"

const router = express.Router()

const loanItemController = new LoanItemController()
const returnItemController = new ReturnItemController()
const listLoansController = new ListLoansController()
const selectLoansController = new SelectLoansController()

router.use(VerifyJwt)

router.get('/', listLoansController.handle)

router.get('/select', selectLoansController.handle)

router.post('/', loanItemController.handle)

router.patch('/:loanId/return', returnItemController.handle)

export default router