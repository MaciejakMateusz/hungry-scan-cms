import {combineReducers, createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {apiHost} from "../apiData";
import {removeCookie, setCookie} from "../utils/utils";

export const executeLogoutFetch = createAsyncThunk(
    'loginFetch/executeLogoutFetch',
    async () => {
        const response = await fetch(`${apiHost}/api/user/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error('Not authorized');
        }

        return response.json();
    });

export const logoutFetchSlice = createSlice(
    {
        name: 'logoutFetch',
        initialState: {
            isLoading: false,
        },
        extraReducers: (builder) => {
            builder.addCase(executeLogoutFetch.pending, state => {
                state.isLoading = true;
            }).addCase(executeLogoutFetch.fulfilled, (state, action) => {
                state.isLoading = false;
                removeCookie('userForename');
                window.location.href = action.payload.redirectUrl;
            }).addCase(executeLogoutFetch.rejected, state => {
                state.isLoading = false;
            })
        }
    }
)

export const executeLoginFetch = createAsyncThunk(
    'loginFetch/executeLoginFetch',
    async (_, {getState, rejectWithValue}) => {
        const state = getState().login.loginForm;
        const response = await fetch(`${apiHost}/api/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: state.username,
                password: state.password
            }),
            credentials: 'include'
        });

        const data = await response.json();

        if (!response.ok) {
            return rejectWithValue(data);
        }

        return data;
    });

export const loginFormSlice = createSlice(
    {
        name: 'loginForm',
        initialState: {
            username: '',
            password: ''
        },
        reducers: {
            setUsername: (state, action) => {
                state.username = action.payload
            },
            setPassword: (state, action) => {
                state.password = action.payload
            }
        }
    });

export const loginFetchSlice = createSlice(
    {
        name: 'loginFetch',
        initialState: {
            isLoading: false,
            notAuthorized: false,
            errorData: null
        },
        extraReducers: (builder) => {
            builder.addCase(executeLoginFetch.pending, state => {
                state.isLoading = true;
                state.notAuthorized = false;
            }).addCase(executeLoginFetch.fulfilled, (state, action) => {
                state.isLoading = false;
                state.notAuthorized = false;
                const currentDate = new Date();
                const expiryDate = currentDate.setMonth(currentDate.getMonth() + 1);
                setCookie("userForename", action.payload.forename, expiryDate);
                window.location.href = state.payload.redirectUrl;
            }).addCase(executeLoginFetch.rejected, (state, action) => {
                state.isLoading = false;
                state.notAuthorized = true;
                state.errorData = action.payload
            })
        }
    }
)

export const {setUsername, setPassword} = loginFormSlice.actions;

const loginReducer = combineReducers({
    loginForm: loginFormSlice.reducer,
    loginFetch: loginFetchSlice.reducer,
    logoutFetch: logoutFetchSlice.reducer
});

export default loginReducer;