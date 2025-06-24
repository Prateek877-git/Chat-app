import { User } from "../models/user.model.js";
import { asyncHandler } from "../utilities/asyncHandler.utility.js"
import { errorHandler } from "../utilities/errorHandler.utility.js"
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const register = asyncHandler(async (req, res, next) => {

    const { username, email, password, gender } = req.body;

    if (!username || !email || !password || !gender) {
        return next(new errorHandler("Please provide all fields", 400));
    }
    const user = await User.findOne({ email });
    if (user) {
        return next(new errorHandler("user already exists", 400));
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const avatarType = gender === "male" ? "boy" : "girl";

    const avatar = `https://avatar.iran.liara.run/public/${avatarType}?username=${username}`;

    const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
        gender,
        avatar

    });

    const tokenData = {
        _id: newUser?._id
    }

    const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRATION || "2d"
    });

    res.status(201)
        .cookie("token", token, {
            expires: new Date(Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "None"
        })
        .json({
            success: true,
            message: "user registerd successfully",
            responseData: {
                newUser,
                token
            }
        });

});
export const login = asyncHandler(async (req, res, next) => {

    const { email, password } = req.body;
    console.log(email, password)
    if (!email || !password) {
        return next(new errorHandler("Please provide all fields", 400));
    }
    const user = await User.findOne({ email });
    if (!user) {
        return next(new errorHandler("user doesn't exist", 400));
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
        return next(new errorHandler("enter a valid username or password", 400))
    }

    const tokenData = {
        _id: user?._id
    }
    const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRATION
    });

    res.status(200)
        .cookie("token", token, {
            expiresIn: new Date(Date.now + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: true,
            sameSite: "None"
        })
        .json({
            success: true,
            responseData:
            {
                user,
                token
            }
        });
});
export const getProfile = asyncHandler(async (req, res, next) => {

    const userId = req.user._id;
    
    if (!userId) {
        return next(new errorHandler("User not found", 404));
    }
    const profile = await User.findById(userId);

    res.status(200).json({
        success: true,
        responseData: profile
    })
});
export const logout = asyncHandler(async (req, res, next) => {

    res.status(200)
        .cookie("token", "", {
            expires: new Date(Date.now()),
            httpOnly: true,
            secure: true,
            sameSite: "Strict"
        })
        .json({
            success: true,
            message: "logged out successfully"
        })
});
export const getOtherUsers = asyncHandler(async (req, res, next) => {
    const otherUsers = await User.find({_id: {$ne: req.user._id}});

    res.status(200).json({
        success: true,
        responseData: otherUsers,
    });
})  