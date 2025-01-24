import {combineReducers, createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {apiHost} from "../apiData";

export const reorderMenuItem = createAsyncThunk(
    'dishesCategories/reorderDish',
    async (credentials, {getState, rejectWithValue}) => {
        const state = getState().dishesCategories.view;
        const menuItem = state.dish;
        const response = await fetch(`${apiHost}/api/cms/items/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: menuItem.id,
                categoryId: menuItem.categoryId,
                displayOrder: credentials.type === 'increment' ? menuItem.displayOrder + 1 : menuItem.displayOrder - 1,
                new: menuItem.new,
                bestseller: menuItem.bestseller,
                name: menuItem.name,
                description: menuItem.description,
                labels: menuItem.labels,
                allergens: menuItem.allergens,
                variants: menuItem.variants,
                additionalIngredients: menuItem.chosenAdditions,
                price: menuItem.price,
                imageName: menuItem.imageName,
                available: menuItem.available,
            }),
            credentials: 'include'
        });

        if (!response.ok) {
            const errorData = await response.json();
            return rejectWithValue(errorData);
        }

        return await response.json();
    }
);

export const reorderMenuItemSlice = createSlice(
    {
        name: 'reorderMenuItem',
        initialState: {
            isLoading: false,
        },
        extraReducers: (builder) => {
            builder
                .addCase(reorderMenuItem.pending, state => {
                    state.isLoading = true;
                })
                .addCase(reorderMenuItem.fulfilled, (state) => {
                    state.isLoading = false;
                })
                .addCase(reorderMenuItem.rejected, (state) => {
                    state.isLoading = false;
                })
        }
    });

export const getCategory = createAsyncThunk(
    'getCategory/getCategory',
    async (credentials, {rejectWithValue}) => {
        const response = await fetch(`${apiHost}/api/cms/categories/show`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: credentials.id,
            credentials: 'include'
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
            },
            credentials: 'include'
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
            isInEditMode: false,
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
            setIsInEditMode: (state, action) => {
                state.isInEditMode = state.newCategoryFormActive || state.editCategoryFormActive || state.newDishFormActive || state.editDishFormActive || action.payload === true;
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
            clearView: state => {
                state.filteringActive = false;
                state.filterValue = '';
                state.filteredItems = null;
                state.filterExpanded = false;
                state.newCategoryFormActive = false;
                state.editCategoryFormActive = false;
                state.newDishFormActive = false;
                state.editDishFormActive = false;
                state.submittedSuccessType = null;
                state.categoryForAction = null;
                state.menuItemForAction = null;
                state.activeRemovalType = null;
                state.category = {};
                state.dish = {};
                state.categories = [];
            }
        }
    });

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
    setIsInEditMode,
    setCategory,
    setDish,
    setCategories,
    clearView
} = dishesCategoriesSlice.actions;

const dishesCategoriesReducer = combineReducers({
    view: dishesCategoriesSlice.reducer,
    getCategories: getCategoriesSlice.reducer,
    getCategory: getCategorySlice.reducer,
    reorderMenuItem: reorderMenuItemSlice.reducer
});

export default dishesCategoriesReducer;