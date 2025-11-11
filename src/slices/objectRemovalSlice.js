import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {apiHost} from "../apiData";
import {getLanguage} from "../locales/langUtils";

export const remove = createAsyncThunk(
    'objectRemoval/remove',
    async (params, {rejectWithValue}) => {
        const id = params.id;
        const path = params.path;
        const response = await fetch(`${apiHost}/api/cms/${path}/delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept-Language': getLanguage()
            },
            body: JSON.stringify(id),
            credentials: 'include'
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