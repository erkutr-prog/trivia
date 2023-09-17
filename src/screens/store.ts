import { combineReducers, configureStore } from "@reduxjs/toolkit";
import optionsSlice from "../features/optionsSlice";
import userInfoSlice from './../features/userSlice'

const rootReducer = combineReducers({
    userInfoSlice: userInfoSlice,
    optionSlice: optionsSlice
})

export type RootState = ReturnType<typeof rootReducer>

export type AppDispatch = typeof store.dispatch

const store = configureStore({
    reducer: rootReducer
})

export default store;