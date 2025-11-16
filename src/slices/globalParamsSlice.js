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
            activeObjDetails: null,
            currentView: STATS,
            cmsActive: false,
            currentDialog: null,
            isInEditMode: false,
            nextViewName: null
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
            setActiveObjDetails: (state, action) => {
                state.activeObjDetails = action.payload;
            },
            setCurrentView: (state, action) => {
                state.currentView = action.payload;
            },
            setCmsActive: (state, action) => {
                state.cmsActive = action.payload;
            },
            setCurrentDialog: (state, action) => {
                state.currentDialog = action.payload;
            },
            setIsInEditMode: (state, action) => {
                state.isInEditMode = action.payload;
            },
            setNextViewName: (state, action) => {
                state.nextViewName = action.payload;
            }
        }
    });

export const {
    setActiveRestaurant,
    setActiveRestaurantId,
    setActiveMenu,
    setActiveMenuId,
    setActiveObjDetails,
    setCurrentView,
    setCmsActive,
    setCurrentDialog,
    setIsInEditMode,
    setNextViewName
} = globalParamsSlice.actions;

const globalParamsReducer = combineReducers({
    globalParams: globalParamsSlice.reducer
});

export default globalParamsReducer;