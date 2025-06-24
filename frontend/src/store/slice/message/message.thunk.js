import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../components/utilities/axiosinstance";


export const sendMessageThunk = createAsyncThunk(
    "message/sendMessages",
    async({recieverId, message}, {rejectWithValue}) => {
        try {
            const response = await axiosInstance.post(`message/send/${recieverId}`,{
                recieverId,
                message
            });
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.log(error);
            const errorOutput = error?.response?.data?.errMessaage;
            return rejectWithValue(errorOutput)
            
        }
    }
)

export const getMessageThunk = createAsyncThunk(
    "message/getMessages",
    async({recieverId}, {rejectWithValue}) => {
        try {
            const response = await axiosInstance.get(`message/getmessages/${recieverId}`,{
                recieverId,
            });
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.log(error);
            const errorOutput = error?.response?.data?.errMessaage;
            return rejectWithValue(errorOutput)
            
        }
    }
)