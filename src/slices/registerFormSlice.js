import {combineReducers, createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {apiHost} from "../apiData";
import {getLanguage} from "../locales/langUtils";


export const executeRegisterFetch = createAsyncThunk(
    'registerFetch/executeRegisterFetch',
    async (_, { getState, rejectWithValue }) => {
        try {
            const state = getState().register.registerForm;
            const response = await fetch(`${apiHost}/api/user/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept-Language': getLanguage()
                },
                body: JSON.stringify({
                    forename: state.forename,
                    surname: state.surname,
                    username: state.username,
                    password: state.password,
                    repeatedPassword: state.repeatedPassword
                }),
                credentials: 'include'
            });

            const data = await response.json();

            if (!response.ok) {
                return rejectWithValue(data);
            }

            return data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

export const registerFetchSlice = createSlice(
    {
        name: 'registerFetch',
        initialState: {
            isLoading: false,
            notAuthorized: false,
            errorData: null
        },
        extraReducers: (builder) => {
            builder.addCase(executeRegisterFetch.pending, state => {
                state.isLoading = true;
                state.notAuthorized = false;
            }).addCase(executeRegisterFetch.fulfilled, (state, action) => {
                state.isLoading = false;
                state.notAuthorized = false;
                window.location.href = action.payload.redirectUrl;
            }).addCase(executeRegisterFetch.rejected, (state, action) => {
                state.isLoading = false;
                state.notAuthorized = true;
                state.errorData = action.payload;
            })
        }
    }
)

export const registerFormSlice = createSlice(
    {
        name: 'registerForm',
        initialState: {
            forename: '',
            surname: '',
            username: '',
            password: '',
            repeatedPassword: ''
        },
        reducers: {
            setForename: (state, action) => {
                state.forename = action.payload
            },
            setSurname: (state, action) => {
                state.surname = action.payload
            },
            setUsername: (state, action) => {
                state.username = action.payload
            },
            setPassword: (state, action) => {
                state.password = action.payload
            },
            setRepeatedPassword: (state, action) => {
                state.repeatedPassword = action.payload
            }
        }
    });

export const {setForename, setSurname, setUsername, setPassword, setRepeatedPassword} = registerFormSlice.actions;

const registerReducer = combineReducers({
    registerForm: registerFormSlice.reducer,
    registerFetch: registerFetchSlice.reducer,
});

export default registerReducer;