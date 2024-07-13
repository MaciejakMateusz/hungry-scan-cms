import {configureStore} from "@reduxjs/toolkit";
import loginReducer from "../slices/loginFormSlice";

export const store = configureStore({
    reducer: loginReducer
});