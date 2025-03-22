import {combineReducers, createSlice} from "@reduxjs/toolkit";

export const cmsSlice = createSlice(
    {
        name: 'view',
        initialState: {
            menu: null
        },
        reducers: {
            setMenu: (state, action) => {
                state.menu = action.payload;
            }
        }
    });

export const {setMenu} = cmsSlice.actions;

const cmsReducer = combineReducers({
    view: cmsSlice.reducer,
});

export default cmsReducer;