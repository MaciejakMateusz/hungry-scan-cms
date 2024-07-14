import {createSlice} from "@reduxjs/toolkit";


export const dishesCategoriesSlice = createSlice(
    {
        name: 'dishesCategories',
        initialState: {
            searchActive: false,
            newCategoryFormActive: false,
            editCategoryFormActive: false,
            newDishFormActive: false,
            editDishFormActive: false,
            submittedSuccessType: null,
            category: {},
            dish: {},
            categories: [],
            form: {
                filter: ''
            }
        },
        reducers: {
            setSearchActive: (state, action) => {
                state.searchActive = action.payload;
            },
            setNewCategoryFormActive: (state, action) => {
                state.newCategoryFormActive = action.payload;
            },
            setEditCategoryFormActive: (state, action) => {
                state.editCategoryFormActive = action.payload;
            },
            setNewDishFormActive: (state, action) => {
                state.newDishFormActive = action.payload;
            },
            setEditDishFormActive: (state, action) => {
                state.editDishFormActive = action.payload;
            },
            setSubmittedSuccessType: (state, action) => {
                state.submittedSuccessType = action.payload;
            },
            setCategory: (state, action) => {
                state.category = action.payload;
            },
            setDish: (state, action) => {
                state.dish = action.payload;
            },
            setCategories: (state, action) => {
                state.categories = action.payload;
            },
            setForm: (state, action) => {
                state.form = action.payload;
            }
        }});

export const {
    setSearchActive,
    setNewCategoryFormActive,
    setEditCategoryFormActive,
    setNewDishFormActive,
    setEditDishFormActive,
    setSubmittedSuccessType,
    setCategory,
    setDish,
    setCategories,
    setForm
} = dishesCategoriesSlice.actions;

const dishesCategoriesReducer = dishesCategoriesSlice.reducer

export default dishesCategoriesReducer;