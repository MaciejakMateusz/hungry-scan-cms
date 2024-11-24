import {combineReducers, createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {apiHost} from "../apiData";

export const executeLogoutFetch = createAsyncThunk(
    'loginFetch/executeLogoutFetch',
    async () => {
        const response = await fetch(`${apiHost}/api/logout`, {
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
            }).addCase(executeLogoutFetch.fulfilled, state => {
                state.isLoading = false;
                window.location.href = `/login`;
            }).addCase(executeLogoutFetch.rejected, state => {
                state.isLoading = false;
            })
        }
    }
)

export const executeLoginFetch = createAsyncThunk(
    'loginFetch/executeLoginFetch',
    async (_, {getState}) => {
        const state = getState().login.loginForm;
        const response = await fetch(`${apiHost}/api/login`, {
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

        if (!response.ok) {
            throw new Error('Not authorized');
        }

        return response.json();
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
            notAuthorized: false
        },
        extraReducers: (builder) => {
            builder.addCase(executeLoginFetch.pending, state => {
                state.isLoading = true;
                state.notAuthorized = false;
            }).addCase(executeLoginFetch.fulfilled, state => {
                state.isLoading = false;
                state.notAuthorized = false;
                window.location.href = `/cms`;
            }).addCase(executeLoginFetch.rejected, state => {
                state.isLoading = false;
                state.notAuthorized = true;
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