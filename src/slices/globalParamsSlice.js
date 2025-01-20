import {combineReducers, createSlice} from "@reduxjs/toolkit";

export const globalParamsSlice = createSlice(
    {
        name: 'globalParams',
        initialState: {
            activeRestaurant: {},
            activeMenu: {},
            currentUser: {},
            cmsActive: false
        },
        reducers: {
            setActiveRestaurant: (state, action) => {
                state.activeRestaurant = action.payload;
            },
            setActiveMenu: (state, action) => {
                state.activeMenu = action.payload;
            },
            setCurrentUser: (state, action) => {
                state.currentUser = action.payload;
            },
            toggleMode: state => {
                state.cmsActive = !state.cmsActive;
            }
        }
    });

export const {setActiveRestaurant, setActiveMenu, setCurrentUser, toggleMode} = globalParamsSlice.actions;

const globalParamsReducer = combineReducers({
    globalParams: globalParamsSlice.reducer
});

export default globalParamsReducer;