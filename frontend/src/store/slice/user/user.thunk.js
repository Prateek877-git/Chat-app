import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from '../../../components/utilities/axiosinstance.js'
import toast from "react-hot-toast";


export const loginUserThunk = createAsyncThunk(
    "users/login",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/user/login", {
                email,
                password,
            });

            // console.log(response.data)
            return response.data;

        } catch (error) {
            console.log(error);
            toast.error(error?.message || "Login failed");
            const errorOutput = error?.response?.data;
            console.log(errorOutput)
            return rejectWithValue(errorOutput);
        }
    }
);

export const registerUserThunk = createAsyncThunk(
    "users/signup",
    async ({ username, email, password, gender }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/user/register", {
                username,
                email,
                password,
                gender,
            });
            toast.success("account created successfully");
            return response.data;
            //  console.log(response.data)
        } catch (error) {
            console.log(error);
            toast.error(error?.message || "Login failed");
            const errorOutput = error?.response?.data;
            return rejectWithValue(errorOutput);
        }
    }
)

export const logoutUserThunk = createAsyncThunk(
    "users/logout",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/user/logout", {

            });
            toast.success("logged out successfully");
            return response.data;
            //  console.log(response.data)
        } catch (error) {
            console.log(error);
            toast.error(error?.message || "Logout failed");
            const errorOutput = error?.response?.data;
            return rejectWithValue(errorOutput);
        }
    }
)
export const getUserProfileThunk = createAsyncThunk(
    "users/getprofile",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/user/getprofile", {

            });
            // console.log(response.data)
            return response.data;
            //  console.log(response.data)
        } catch (error) {
            // console.error(error)
            const errorOutput = error?.response?.data?.errMessage;
            // toast.error(errorOutput);
            return rejectWithValue(errorOutput);
        }
    }
)
export const getOtherUserThunk = createAsyncThunk(
    "users/getOtherUsers",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/user/getOtherUsers", {

            });
            // console.log(response.data)
            return response.data;

        } catch (error) {
            console.error(error)
            const errorOutput = error?.response?.data?.errMessage;
            toast.error(errorOutput);
            return rejectWithValue(errorOutput);
        }
    }
)