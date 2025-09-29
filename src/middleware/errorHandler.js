import { ApiError } from "../utils/ApiError.js";

export const errorHandler = (error, req, res, next) => {
    if (error instanceof ApiError) {
        return res.status(error.statusCode).json({
            message: error.message,
            statusCode: error.statusCode
        });
    }

    console.error("Unexpected error:", error);
    
    res.status(500).json({
        message: "Internal server error",
        statusCode: 500
    });
};
