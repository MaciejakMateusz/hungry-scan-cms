import {combineReducers, createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {apiHost} from "../apiData";
import {getDecodedJwt} from "../utils";

export const getCategories = createAsyncThunk(
    'getCategories/getCategories',
    async (_, {rejectWithValue}) => {
        const response = await fetch(`${apiHost}/api/cms/categories`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getDecodedJwt()}`
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            return rejectWithValue(errorData);
        }

        return await response.json();
    }
);

export const getCategoriesSlice = createSlice({
    name: 'getCategories',
    initialState: {
        isLoading: false
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCategories.pending, state => {
                state.isLoading = true;
            })
            .addCase(getCategories.fulfilled, state => {
                state.isLoading = false;
            })
            .addCase(getCategories.rejected, (state) => {
                state.isLoading = false;
            })
    }
})

export const dishesCategoriesSlice = createSlice(
    {
        name: 'view',
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

const dishesCategoriesReducer = combineReducers({
    view: dishesCategoriesSlice.reducer,
    getCategories: getCategoriesSlice.reducer
});

export default dishesCategoriesReducer;