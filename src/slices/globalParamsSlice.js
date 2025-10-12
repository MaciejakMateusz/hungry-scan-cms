import {combineReducers, createSlice} from "@reduxjs/toolkit";
import {STATS} from "../utils/viewsConstants";

export const globalParamsSlice = createSlice(
    {
        name: 'globalParams',
        initialState: {
            activeRestaurant: null,
            activeRestaurantId: null,
            activeMenu: null,
            activeMenuId: null,
            currentView: STATS,
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
            setCurrentView: (state, action) => {
                state.currentView = action.payload;
            },
            setCmsActive: (state, action) => {
                state.cmsActive = action.payload;
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
    setCurrentView,
    setCmsActive,
    setCurrentDialog
} = globalParamsSlice.actions;

const globalParamsReducer = combineReducers({
    globalParams: globalParamsSlice.reducer
});

export default globalParamsReducer;