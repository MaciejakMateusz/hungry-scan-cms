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
            isCmsInEditMode: false,
            isDashboardInEditMode: false,
            nextViewName: null,
            previewActive: false,
            navPanelCollapsed: false,
            mobileNavActive: false,
            confirmLogout: false
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
            setCmsInEditMode: (state, action) => {
                state.isCmsInEditMode = action.payload;
            },
            setDashboardInEditMode: (state, action) => {
                state.isDashboardInEditMode = action.payload;
            },
            setNextViewName: (state, action) => {
                state.nextViewName = action.payload;
            },
            setPreviewActive: (state, action) => {
                state.previewActive = action.payload;
            },
            setNavPanelCollapsed: (state, action) => {
                state.navPanelCollapsed = action.payload;
            },
            setMobileNavActive: (state, action) => {
                state.mobileNavActive = action.payload;
            },
            setConfirmLogout: (state, action) => {
                state.confirmLogout = action.payload;
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
    setCmsInEditMode,
    setDashboardInEditMode,
    setNextViewName,
    setPreviewActive,
    setNavPanelCollapsed,
    setMobileNavActive,
    setConfirmLogout
} = globalParamsSlice.actions;

const globalParamsReducer = combineReducers({
    globalParams: globalParamsSlice.reducer
});

export default globalParamsReducer;