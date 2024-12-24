import { Response } from "express";

interface SuccessResponse<T> {
    statusCode: number;
    success: boolean;
    message: string;
    data: T;
}

interface ErrorResponse {
    success: boolean;
    message: string;
    error?: any;
}

export class ResponseHandler{
    static success<T>(
        res: Response,
        statusCode: number,
        success: boolean,
        message: string,
        data: T
    ): SuccessResponse<T> {
        const response = {
            statusCode,
            success,
            message,
            data,
        };

        res.status(statusCode).json(response);

        return response;
    }

    static error(
        res: Response,
        statusCode: number,
        success: boolean,
        message: string,
        error?: any
    ): ErrorResponse {
        const response = {
            success: false,
            message,
            error: error instanceof Error ? error.message : error,
        };

        res.status(statusCode).json(response);

        return response;
    }


}