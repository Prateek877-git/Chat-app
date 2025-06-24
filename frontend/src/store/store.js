import userReducer from "./slice/user/user.slice.js";
import messageReducer from "./slice/message/message.slice.js";
import { configureStore } from "@reduxjs/toolkit";
import  socketReducer  from "./slice/socket/socket.slice.js";


export const store = configureStore({
    reducer: {
        user: userReducer,
        message: messageReducer,
        socket: socketReducer,
    },

    middleware: (getDefaultMiddleware) => (
        getDefaultMiddleware({
            serializableCheck:{
                ignoredPaths:["socket.socket"]
            }
        })
    )
})