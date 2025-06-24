import jwt from "jsonwebtoken";
import { asyncHandler } from "../utilities/asyncHandler.utility.js";
import { errorHandler } from "../utilities/errorHandler.utility.js";


export const isAuthenticated = asyncHandler(async (req, res, next) => {
    const token = req.cookies.token || req.headers["authorization"]?.replace("Bearer ", "");
    if (!token) {
        return next(new errorHandler("Invalid token", 401))
    }

    try {
        const tokenData = jwt.verify(token, process.env.JWT_SECRET);
        req.user = tokenData;
        next();

    } catch (error) {
        console.log(error);
        return next(new errorHandler("Invalid token", 401));
    }

});