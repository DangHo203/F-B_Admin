import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import userSlice from "./userSlice";
const persistConfig = {
    key: "test",
    storage,
};

export const rootStore = configureStore({
    reducer: {
        userSlice: persistReducer(persistConfig, userSlice),
    },
});
export const persistor = persistStore(rootStore);
