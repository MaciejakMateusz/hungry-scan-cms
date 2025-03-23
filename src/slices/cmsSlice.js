import {combineReducers, createSlice} from "@reduxjs/toolkit";

export const cmsSlice = createSlice(
    {
        name: 'view',
        initialState: {
            menu: null,
            weekDay: null,
            timeFrom: null,
            timeTo: null
        },
        reducers: {
            setMenu: (state, action) => {
                state.menu = action.payload;
            },
            setWeekDay: (state, action) => {
                state.weekDay = action.payload;
            },
            setTimeFrom: (state, action) => {
                state.timeFrom = action.payload;
            },
            setTimeTo: (state, action) => {
                state.timeTo = action.payload;
            }
        }
    });

export const {setMenu, setWeekDay, setTimeFrom, setTimeTo} = cmsSlice.actions;

const cmsReducer = combineReducers({
    view: cmsSlice.reducer,
});

export default cmsReducer;