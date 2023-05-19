import { createSlice } from "@reduxjs/toolkit";
import { UserInfo } from "../models/Category";

const initialState: UserInfo = {
    displayName: '',
    email: '',
    photoUrl: ''
}

const userInfoSlice = createSlice({
    name: 'UserInfoSlice',
    initialState: initialState,
    reducers: {
        setUserInfo(state, action) {
            state.displayName = action.payload.displayName
            state.email = action.payload.email
            state.photoUrl = action.payload.photoUrl
        }
    }
})

export const {setUserInfo} = userInfoSlice.actions
export default userInfoSlice.reducer