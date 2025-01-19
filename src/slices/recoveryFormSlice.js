import {combineReducers, createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {apiHost} from "../apiData";
import {urlParamValue} from "../utils/utils";

export const executeRecoveryFetch = createAsyncThunk(
    'recoveryFetch/executeRecoveryFetch',
    async (_, {getState, rejectWithValue}) => {
        try {
            const state = getState().recovery.recoveryForm;
            const response = await fetch(`${apiHost}/api/user/confirm-recovery`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    password: state.password,
                    repeatedPassword: state.repeatedPassword,
                    emailToken: urlParamValue('token')
                }),
                credentials: 'include'
            });

            let data = {}
            try {
                data = await response.json()
            } catch (error) {
                return data
            }

            if (!response.ok) {
                return rejectWithValue(data);
            }

            return data
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

export const recoveryFetchSlice = createSlice(
    {
        name: 'recoveryFetch',
        initialState: {
            isLoading: false,
            errorData: null
        },
        extraReducers: (builder) => {
            builder.addCase(executeRecoveryFetch.pending, state => {
                state.isLoading = true;
            }).addCase(executeRecoveryFetch.fulfilled, state => {
                state.isLoading = false;
                window.location.href = '/recovery-confirmation'
            }).addCase(executeRecoveryFetch.rejected, (state, action) => {
                state.isLoading = false;
                state.errorData = action.payload;
            })
        }
    }
)

export const recoveryFormSlice = createSlice(
    {
        name: 'recoveryInitForm',
        initialState: {
            password: '',
            repeatedPassword: '',
        },
        reducers: {
            setPassword: (state, action) => {
                state.password = action.payload
            },
            setRepeatedPassword: (state, action) => {
                state.repeatedPassword = action.payload
            }
        }
    });

export const executeRecoveryInitFetch = createAsyncThunk(
    'recoveryFetch/executeRecoveryInitFetch',
    async (_, {getState, rejectWithValue}) => {
        try {
            const state = getState().recovery.recoveryInitForm;
            const response = await fetch(`${apiHost}/api/user/recover`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: state.username
                }),
                credentials: 'include'
            });

            let data = {}
            try {
                data = await response.json()
            } catch (error) {
                return data
            }

            if (!response.ok) {
                return rejectWithValue(data);
            }

            return data
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

export const recoveryInitFetchSlice = createSlice(
    {
        name: 'recoveryInitFetch',
        initialState: {
            isLoading: false,
            errorData: null
        },
        extraReducers: (builder) => {
            builder.addCase(executeRecoveryInitFetch.pending, state => {
                state.isLoading = true;
            }).addCase(executeRecoveryInitFetch.fulfilled, state => {
                state.isLoading = false;
                window.location.href = '/recovery-sent'
            }).addCase(executeRecoveryInitFetch.rejected, (state, action) => {
                state.isLoading = false;
                state.errorData = action.payload;
            })
        }
    }
)

export const recoveryInitFormSlice = createSlice(
    {
        name: 'recoveryInitForm',
        initialState: {
            username: '',
        },
        reducers: {
            setUsername: (state, action) => {
                state.username = action.payload
            }
        }
    });

export const {setUsername} = recoveryInitFormSlice.actions;
export const {setPassword, setRepeatedPassword} = recoveryFormSlice.actions;

const recoveryReducer = combineReducers({
    recoveryInitForm: recoveryInitFormSlice.reducer,
    recoveryInitFetch: recoveryInitFetchSlice.reducer,
    recoveryForm: recoveryFormSlice.reducer,
    recoveryFetch: recoveryFetchSlice.reducer
});

export default recoveryReducer;