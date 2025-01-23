import {combineReducers, createSlice} from "@reduxjs/toolkit";

export const globalParamsSlice = createSlice(
    {
        name: 'globalParams',
        initialState: {
            activeRestaurant: {},
            activeMenu: {},
            userForename: '',
            currentView: 'dashboard/stats',
            cmsActive: false,
            currentDialog: null,
        },
        reducers: {
            setActiveRestaurant: (state, action) => {
                state.activeRestaurant = action.payload;
            },
            setActiveMenu: (state, action) => {
                state.activeMenu = action.payload;
            },
            setUserForename: (state, action) => {
                state.currentUser = action.payload;
            },
            setCurrentView: (state, action) => {
                state.currentView = action.payload;
                state.cmsActive = state.currentView.includes("cms");
            },
            setCurrentDialog: (state, action) => {
                state.currentDialog = action.payload;
            }
        }
    });

export const {
    setActiveRestaurant,
    setActiveMenu,
    setUserForename,
    setCurrentView,
    setCurrentDialog} = globalParamsSlice.actions;

const globalParamsReducer = combineReducers({
    globalParams: globalParamsSlice.reducer
});

export default globalParamsReducer;