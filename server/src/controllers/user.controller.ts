import { Request, Response } from "express";
import { registerUserService, loginUserService } from "../services/user.service";
import { ResponseHandler } from "../utils/ResponseHandler";


const registerUserController =
    async (req: Request, res: Response) => {
        try {
            const { name, email, password } = req.body

            if (!name || !email || !password) {
                ResponseHandler.error(res, 400, false, "All fields are required.");
                return
            }

            const user = await registerUserService({ name, email, password })

            ResponseHandler.success(res, 201, true, "User created successfully.", user
            )
        } catch (error) {
            ResponseHandler.error(res, 400, false, "Error creating user.", error)
        }
    }


const loginUserController =
    async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body
            if (!email || !password) {
                ResponseHandler.error(res, 400, false, "Email and password are required.")
                return

            }
            const user = await loginUserService({ email, password })

            ResponseHandler.success(res, 200, true, "Successfully logged in.", user)
        } catch (error) {
            ResponseHandler.error(res, 400, false, "logIn error", error)
        }
    }

export {
    registerUserController,
    loginUserController
}