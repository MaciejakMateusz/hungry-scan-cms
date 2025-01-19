import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {apiHost} from "../apiData";

export const filter = createAsyncThunk(
    'filtering/filter',
    async (credentials, {rejectWithValue}) => {
        const path = credentials.path;
        const value = credentials.value;
        const response = await fetch(`${apiHost}/api/cms/${path}/filter`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: value,
            credentials: 'include'
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            return rejectWithValue(errorData);
        }

        try {
            return await response.json();
        } catch (error) {
            return {};
        }
    }
);

export const filteringSlice = createSlice(
    {
        name: 'filter',
        initialState: {
            isLoading: false,
        },
        extraReducers: (builder) => {
            builder
                .addCase(filter.pending, state => {
                    state.isLoading = true;
                })
                .addCase(filter.fulfilled, state => {
                    state.isLoading = false;
                    state.removalError = {};
                })
                .addCase(filter.rejected, (state, action) => {
                    state.isLoading = false;
                    state.removalError = action.payload;
                })
        }
    });


const filteringReducer = filteringSlice.reducer;

export default filteringReducer;