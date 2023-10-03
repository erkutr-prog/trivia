import { createSlice } from "@reduxjs/toolkit";
import { SettingsInfo } from "../models/Category";

const initialState: SettingsInfo = {
    darkTheme: 'light'
}

const userInfoSlice = createSlice({
    name: 'UserInfoSlice',
    initialState: initialState,
    reducers: {
        setTheme(state, action) {
            state.darkTheme = action.payload
        }
    }
})

export const {setTheme} = userInfoSlice.actions
export default userInfoSlice.reducer