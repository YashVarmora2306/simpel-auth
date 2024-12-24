import { Router } from "express";
import { registerUserController, loginUserController } from "../controllers/user.controller";
import { createUserValidator, loginUserValidator } from "../validators/user.validators";
import validateRequest from "../middlewares/validateRequest.middleware";

const router = Router()

router.post("/register", createUserValidator, validateRequest, registerUserController)

router.post("/login", loginUserValidator, validateRequest, loginUserController)

export default router;