import { io } from 'socket.io-client'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    socket: null,
    onlineUsers: JSON.parse(localStorage.getItem("onlineUsers")),
}

export const socketSlice = createSlice({
    name: 'socket',
    initialState,
    reducers: {
        initializeSocket: (state, action) => {
            const socket = io(import.meta.env.VITE_DB_ORIGIN, {
                query: {
                    userId: action.payload,
                }
            });

            state.socket = socket;
        },
        setOnlineUsers: (state, action) => {
            localStorage.setItem("onlineUsers", JSON.stringify(action.payload))
            state.onlineUsers = action.payload;
        }
    }
})

export const { initializeSocket, setOnlineUsers } = socketSlice.actions;

export default socketSlice.reducer;