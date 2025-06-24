import { createSlice } from '@reduxjs/toolkit'
import { getOtherUserThunk, getUserProfileThunk, loginUserThunk, logoutUserThunk, registerUserThunk } from './user.thunk'


const initialState = {
    isAuthenticated: false,
    screenLoading: true,
    buttonLoading: false,
    userProfile: null,
    otherUsers: null,
    selectedUser: JSON.parse(localStorage.getItem("selectedUser")),
}


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setSelectedUser: (state, action) => {
            localStorage.setItem("selectedUser", JSON.stringify(action.payload));
            state.selectedUser = action.payload;
        }

    },
    extraReducers: (builder) => {
        // user login
        builder.addCase(loginUserThunk.pending, (state, action) => {
            state.buttonLoading = true;

        });
        builder.addCase(loginUserThunk.fulfilled, (state, action) => {
            state.isAuthenticated = true;
            state.buttonLoading = false;
            state.userProfile = action.payload?.responseData?.user;

        });
        builder.addCase(loginUserThunk.rejected, (state, action) => {
        });

        //user register
        builder.addCase(registerUserThunk.pending, (state, action) => {

        });
        builder.addCase(registerUserThunk.fulfilled, (state, action) => {
            state.userProfile = action.payload?.responseData?.user;
            state.isAuthenticated = true;
            state.buttonLoading = true;
        });
        builder.addCase(registerUserThunk.rejected, (state, action) => {

        });

        //user logout
        builder.addCase(logoutUserThunk.pending, (state, action) => {

        });
        builder.addCase(logoutUserThunk.fulfilled, (state, action) => {
            state.isAuthenticated = false;
            state.screenLoading = false;
            state.userProfile = null;
            state.selectedUser = null;
            
            
            localStorage.clear();
        });
        builder.addCase(logoutUserThunk.rejected, (state, action) => {
            state.screenLoading = false;
        });

        //get user profile
        builder.addCase(getUserProfileThunk.pending, (state, action) => {

        });
        builder.addCase(getUserProfileThunk.fulfilled, (state, action) => {
            state.isAuthenticated = true;
            state.userProfile = action.payload?.responseData;
            state.screenLoading = false;
        });
        builder.addCase(getUserProfileThunk.rejected, (state, action) => {
            state.screenLoading = false;
        });

        // get other user
        builder.addCase(getOtherUserThunk.pending, (state, action) => {

        });
        builder.addCase(getOtherUserThunk.fulfilled, (state, action) => {
            state.isAuthenticated = true;
            state.otherUsers = action.payload?.responseData;
        });
        builder.addCase(getOtherUserThunk.rejected, (state, action) => {
            console.log("rejected");
        });
    },
})

export const { setSelectedUser } = userSlice.actions;

export default userSlice.reducer;