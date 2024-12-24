import { NextFunction, Request, Response } from "express";
import { ResponseHandler } from "../utils/ResponseHandler";
import logger from "../utils/logger";



interface Error{
    name: string;
    message: string;
    stack?: string;
}

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(err.stack || "No stack trace");

    const statusCode = err instanceof Error ? 500 : 400
    

    ResponseHandler.error(res, statusCode, false, err.message || "Internal Server Error", err.stack);

}

export default errorHandler;