import express from "express"
import { VerifyJwt } from "../middlewares/verify-jwt"
import { LoanItemController } from "../controllers/loan-item-controller"
import { ReturnItemController } from "../controllers/return-item-controller"
import { ListLoansController } from "../controllers/list-loans-controller"

const router = express.Router()

const loanItemController = new LoanItemController()
const returnItemController = new ReturnItemController()
const listLoansController = new ListLoansController()

router.use(VerifyJwt)

router.get('/', listLoansController.handle)

router.post('/', loanItemController.handle)

router.patch('/:loanId/return', returnItemController.handle)

export default router