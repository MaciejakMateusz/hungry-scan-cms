import {combineReducers, createSlice} from "@reduxjs/toolkit";
import {getCookie} from "../utils/utils";

export const globalParamsSlice = createSlice(
    {
        name: 'globalParams',
        initialState: {
            activeRestaurant: null,
            activeRestaurantId: null,
            activeMenu: null,
            activeMenuId: null,
            userForename: getCookie("userForename"),
            currentView: 'dashboard/stats',
            cmsActive: false,
            currentDialog: null,
        },
        reducers: {
            setActiveRestaurant: (state, action) => {
                state.activeRestaurant = action.payload;
            },
            setActiveRestaurantId: (state, action) => {
                state.activeRestaurantId = action.payload;
            },
            setActiveMenu: (state, action) => {
                state.activeMenu = action.payload;
            },
            setActiveMenuId: (state, action) => {
                state.activeMenuId = action.payload;
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
    setActiveRestaurantId,
    setActiveMenu,
    setActiveMenuId,
    setUserForename,
    setCurrentView,
    setCurrentDialog} = globalParamsSlice.actions;

const globalParamsReducer = combineReducers({
    globalParams: globalParamsSlice.reducer
});

export default globalParamsReducer;