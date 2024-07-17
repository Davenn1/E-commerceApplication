import { configureStore } from "@reduxjs/toolkit";
import cashReducer from "../Redux/cashSlice"
import itemReducer from "./itemSlice";
export const store = configureStore({
    reducer:{
        cash : cashReducer,
        item : itemReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;



