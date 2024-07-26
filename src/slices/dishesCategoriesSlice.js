import {combineReducers, createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {apiHost} from "../apiData";
import {getDecodedJwt} from "../utils";

export const getCategory = createAsyncThunk(
    'getCategory/getCategory',
    async (credentials, {rejectWithValue}) => {
        const response = await fetch(`${apiHost}/api/cms/categories/show`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getDecodedJwt()}`
            },
            body: credentials.id
        });

        if (!response.ok) {
            const errorData = await response.json();
            return rejectWithValue(errorData);
        }

        return await response.json();
    }
);

export const getCategorySlice = createSlice({
    name: 'getCategory',
    initialState: {
        isLoading: false,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCategory.pending, state => {
                state.isLoading = true;
            })
            .addCase(getCategory.fulfilled, state => {
                state.isLoading = false;
            })
            .addCase(getCategory.rejected, (state) => {
                state.isLoading = false;
            })
    }
})

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
});

export const dishesCategoriesSlice = createSlice(
    {
        name: 'view',
        initialState: {
            filteringActive: false,
            filterValue: '',
            filteredItems: null,
            filterExpanded: false,
            newCategoryFormActive: false,
            editCategoryFormActive: false,
            newDishFormActive: false,
            editDishFormActive: false,
            submittedSuccessType: null,
            categoryForAction: null,
            menuItemForAction: null,
            activeRemovalType: null,
            category: {},
            dish: {},
            categories: []
        },
        reducers: {
            setFilteringActive: (state, action) => {
                state.filteringActive = action.payload;
            },
            setFilterValue: (state, action) => {
                state.filterValue = action.payload;
            },
            setFilteredItems: (state, action) => {
                state.filteredItems = action.payload;
            },
            setFilterExpanded: (state, action) => {
                state.filterExpanded = action.payload;
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
            setCategoryForAction: (state, action) => {
                state.categoryForAction = action.payload;
            },
            setMenuItemForAction: (state, action) => {
                state.menuItemForAction = action.payload;
            },
            setActiveRemovalType: (state, action) => {
                state.activeRemovalType = action.payload;
            },
            setCategory: (state, action) => {
                state.category = action.payload;
            },
            setDish: (state, action) => {
                state.dish = action.payload;
            },
            setCategories: (state, action) => {
                state.categories = action.payload;
            }
        }});

export const {
    setFilteringActive,
    setFilterValue,
    setFilteredItems,
    setFilterExpanded,
    setNewCategoryFormActive,
    setEditCategoryFormActive,
    setNewDishFormActive,
    setEditDishFormActive,
    setSubmittedSuccessType,
    setCategoryForAction,
    setMenuItemForAction,
    setActiveRemovalType,
    setCategory,
    setDish,
    setCategories
} = dishesCategoriesSlice.actions;

const dishesCategoriesReducer = combineReducers({
    view: dishesCategoriesSlice.reducer,
    getCategories: getCategoriesSlice.reducer,
    getCategory: getCategorySlice.reducer
});

export default dishesCategoriesReducer;