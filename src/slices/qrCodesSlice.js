import {combineReducers, createSlice} from "@reduxjs/toolkit";


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


const qrCodesReducer = combineReducers({
    view: qrCodesSlice.reducer
});

export default qrCodesReducer;