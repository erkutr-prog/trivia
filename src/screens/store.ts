import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userInfoSlice from './../features/userSlice'

const rootReducer = combineReducers({
    userInfoSlice: userInfoSlice
})

export type RootState = ReturnType<typeof rootReducer>

export type AppDispatch = typeof store.dispatch

const store = configureStore({
    reducer: rootReducer
})

export default store;