import { NextFunction, Response } from "express"
import { validationResult } from "express-validator"
import { Request } from "express-validator/lib/base"
import { ResponseHandler } from "../utils/ResponseHandler";

const validateRequest = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        ResponseHandler.error(res, 400, false, "Validation error", errors.array()[0])
    }
    next()
}

export default validateRequest