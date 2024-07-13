import {combineReducers, createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {apiHost} from "../apiData";

export const executeLoginFetch = createAsyncThunk(
    'loginFetch/executeLoginFetch',
    async (credentials, {getState}) => {
        const state = getState().loginForm;
        const response = await fetch(`${apiHost}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: state.username,
                password: state.password
            })
        });

        if(!response.ok) {
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
        }});

export const loginFetchSlice = createSlice(
    {
        name: 'loginFetch',
        initialState: {
            isLoading: false,
            notAuthorized: false
        },
        extraReducers: (builder) => {
            builder
                .addCase(executeLoginFetch.pending, state => {
                state.isLoading = true;
                state.notAuthorized = false;
            })
                .addCase(executeLoginFetch.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.notAuthorized = false;
                    const maxAge = 20 * 60 * 60;
                    document.cookie = `jwt=${encodeURIComponent(JSON.stringify(action.payload))}; path=/; max-age=${maxAge}`;
                    window.location.href = `/cms`;
                })
                .addCase(executeLoginFetch.rejected, state => {
                    state.isLoading = false;
                    state.notAuthorized = true;
                })
        }
    }
)

export const {setUsername, setPassword} = loginFormSlice.actions;

const loginReducer = combineReducers({
    loginForm: loginFormSlice.reducer,
    loginFetch: loginFetchSlice.reducer
});

export default loginReducer;