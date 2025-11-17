import {combineReducers, createSlice} from "@reduxjs/toolkit";

export const menuPreviewSlice = createSlice(
    {
        name: 'view',
        initialState: {
            category: null,
            menuItem: null,
            filterActive: false,
            filterValue: '',
            filteredItems: null,
            filterExpanded: false
        },
        reducers: {
            setCategory: (state, action) => {
                state.chosenCategory = action.payload;
            },
            setFilterActive: (state, action) => {
                state.filterActive = action.payload;
            },
            setFilterValue: (state, action) => {
                state.filterValue = action.payload;
            },
            setFilterExpanded: (state, action) => {
                state.filterExpanded = action.payload;
            },
            setMenuItem: (state, action) => {
                state.menuItem = action.payload;
            },
            setFilteredItems: (state, action) => {
                state.filteredItems = action.payload;
            }
        }
    });

export const {
    setCategory,
    setFilterActive,
    setFilterValue,
    setFilterExpanded,
    setMenuItem,
    setFilteredItems
} = menuPreviewSlice.actions;

const menuPreviewReducer = combineReducers({
    view: menuPreviewSlice.reducer
});

export default menuPreviewReducer;