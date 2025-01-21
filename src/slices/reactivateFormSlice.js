import {combineReducers, createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {apiHost} from "../apiData";

export const executeReactivateFetch = createAsyncThunk(
    'reactivateFetch/executeReactivateFetch',
    async (_, {getState, rejectWithValue}) => {
        try {
            const state = getState().reactivate.reactivateForm;
            const response = await fetch(`${apiHost}/api/user/resend-activation`, {
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

export const reactivateFetchSlice = createSlice(
    {
        name: 'reactivateFetch',
        initialState: {
            isLoading: false,
            errorData: null
        },
        extraReducers: (builder) => {
            builder.addCase(executeReactivateFetch.pending, state => {
                state.isLoading = true;
            }).addCase(executeReactivateFetch.fulfilled, (state, action) => {
                state.isLoading = false;
                window.location.href = action.payload.redirectUrl;
            }).addCase(executeReactivateFetch.rejected, (state, action) => {
                state.isLoading = false;
                state.errorData = action.payload;
            })
        }
    }
)

export const reactivateFormSlice = createSlice(
    {
        name: 'reactivateForm',
        initialState: {
            username: '',
        },
        reducers: {
            setUsername: (state, action) => {
                state.username = action.payload
            }
        }
    });

export const {setUsername} = reactivateFormSlice.actions;

const reactivateReducer = combineReducers({
    reactivateForm: reactivateFormSlice.reducer,
    reactivateFetch: reactivateFetchSlice.reducer,
});

export default reactivateReducer;