import express from "express"
import { VerifyJwt } from "../middlewares/verify-jwt"
import { LoanItemController } from "../controllers/loan-item-controller"

const router = express.Router()

const loanItemController = new LoanItemController()

router.use(VerifyJwt)

router.post('/', loanItemController.handle)

export default router