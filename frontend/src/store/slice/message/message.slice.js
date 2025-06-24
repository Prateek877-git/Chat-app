import { createSlice } from "@reduxjs/toolkit";
import { getMessageThunk, sendMessageThunk } from "./message.thunk"


const initialState = {
    messages: [],
    buttonLoading: false,
    screenLoading: false,
}

export const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        setNewMessage: (state, action) => {
            const oldMessages = state.messages ?? [];

            state.messages = [...oldMessages, action.payload];
        }
    },
    extraReducers: (builder) => {
        // send message
        builder.addCase(sendMessageThunk.pending, (state, action) => {
            state.buttonLoading = true;
        });
        builder.addCase(sendMessageThunk.fulfilled, (state, action) => {
            // state.buttonLoading = false;
            const oldMessages = state.messages ?? [];
            state.messages = [...oldMessages, action.payload?.responseData];

        });
        builder.addCase(sendMessageThunk.rejected, (state, action) => {
            // console.log("rejected");
        });
        //get messages
        builder.addCase(getMessageThunk.pending, (state, action) => {
            state.buttonLoading = true;
        });
        builder.addCase(getMessageThunk.fulfilled, (state, action) => {
            state.messages = action.payload?.responseData?.messages;
            console.log(action.payload)

        });
        builder.addCase(getMessageThunk.rejected, (state, action) => {
            console.log("rejected");
        });
    }
})

export const { setNewMessage } = messageSlice.actions;

export default messageSlice.reducer;