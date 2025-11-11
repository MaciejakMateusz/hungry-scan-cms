import {combineReducers, createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {apiHost} from "../apiData";
import {getLanguage} from "../locales/langUtils";

export const generateBasicQr = createAsyncThunk(
    'generateBasicQr/generateBasicQr',
    async (_, {rejectWithValue}) => {
        const response = await fetch(`${apiHost}/api/cms/qr/generate-qr`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept-Language': getLanguage()
            },
            credentials: 'include'
        });

        if (!response.ok) {
            const errorData = await response.json();
            return rejectWithValue(errorData);
        }

        return await response.json();
    }
);

export const generateBasicQrSlice = createSlice({
    name: 'generateBasicQr',
    initialState: {
        isLoading: false
    },
    extraReducers: (builder) => {
        builder
            .addCase(generateBasicQr.pending, state => {
                state.isLoading = true;
            })
            .addCase(generateBasicQr.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(generateBasicQr.rejected, (state) => {
                state.isLoading = false;
            })
    }
});

export const qrCodesSlice = createSlice({
    name: 'view',
    initialState: {
        shareActive: false,
    },
    reducers: {
        setShareActive: (state, action) => {
            state.shareActive = action.payload;
        },
        clearView: state => {
            state.shareActive = false;
        }
    }
});


export const {
    clearView,
    setShareActive
} = qrCodesSlice.actions;

export const {isLoading} = generateBasicQrSlice.actions;

const qrCodesReducer = combineReducers({
    view: qrCodesSlice.reducer,
    generateBasicQr: generateBasicQrSlice.reducer
});

export default qrCodesReducer;