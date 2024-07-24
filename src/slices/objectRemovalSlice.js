import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {apiHost} from "../apiData";
import {getDecodedJwt} from "../utils";

export const remove = createAsyncThunk(
    'objectRemoval/remove',
    async (credentials, {rejectWithValue}) => {
        const id = credentials.id;
        const path = credentials.path;
        const response = await fetch(`${apiHost}/api/cms/${path}/delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getDecodedJwt()}`
            },
            body: JSON.stringify(id)
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            return rejectWithValue(errorData || {message: `Failed to remove object with id: ${id}`});
        }

        try {
            return await response.json();
        } catch (error) {
            return {};
        }
    }
);

export const objectRemovalSlice = createSlice(
    {
        name: 'remove',
        initialState: {
            isLoading: false,
            removalError: {},
        },
        reducers: {
            setRemovalError: (state, action) => {
                state.removalError = action.payload;
            }
        },
        extraReducers: (builder) => {
            builder
                .addCase(remove.pending, state => {
                    state.isLoading = true;
                })
                .addCase(remove.fulfilled, state => {
                    state.isLoading = false;
                    state.removalError = {};
                })
                .addCase(remove.rejected, (state, action) => {
                    state.isLoading = false;
                    state.removalError = action.payload;
                })
        }
    });

export const {setRemovalError} = objectRemovalSlice.actions;

const objectRemovalReducer = objectRemovalSlice.reducer;

export default objectRemovalReducer;