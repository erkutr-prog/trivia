import { combineReducers, configureStore } from "@reduxjs/toolkit";
import optionsSlice from "../features/optionsSlice";
import settingsSlice from "../features/settingsSlice";
import userInfoSlice from './../features/userSlice'
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import AsyncStorage from "@react-native-async-storage/async-storage";

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    blacklist: ['optionInfoSlice', 'userInfoSlice']
}

/* const settingsPersistConfig = {
    key: 'settings',
    storage: AsyncStorage,
    whitelist: ['darkTheme']
}
 */
const rootReducer = combineReducers({
    userInfoSlice: userInfoSlice,
    optionSlice: optionsSlice,
    settingsSlice: /* persistReducer(settingsPersistConfig, settingsSlice) */ settingsSlice,
})

export type RootState = ReturnType<typeof rootReducer>

export type AppDispatch = typeof store.dispatch

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
})

export const persistor = persistStore(store)