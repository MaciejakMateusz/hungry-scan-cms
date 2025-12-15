import {combineReducers, createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {apiHost} from "../apiData";
import {getLanguage} from "../locales/langUtils";

export const updateCategoriesOrder = createAsyncThunk(
    'updateCategoriesOrder/updateCategoriesOrder',
    async (params, {rejectWithValue}) => {
        const response = await fetch(`${apiHost}/api/cms/categories/display-orders`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept-Language': getLanguage()
            },
            body: JSON.stringify(params.categories),
            credentials: 'include'
        });

        if (!response.ok) {
            const errorData = await response.json();
            return rejectWithValue(errorData);
        }

        try {
            return await response.json();
        } catch (error) {
            return {};
        }
    }
);

export const updateCategoriesOrderSlice = createSlice({
    name: 'updateCategoriesOrder',
    initialState: {
        isLoading: false,
        errorData: null
    },
    reducers: {
        setErrorData: (state, action) => {
            state.errorData = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateMenuItemsOrder.pending, state => {
                state.isLoading = true;
            })
            .addCase(updateMenuItemsOrder.fulfilled, state => {
                state.isLoading = false;
            })
            .addCase(updateMenuItemsOrder.rejected, (state) => {
                state.isLoading = false;
            })
    }
})

export const updateMenuItemsOrder = createAsyncThunk(
    'updateMenuItemsOrder/updateMenuItemsOrder',
    async (params, {rejectWithValue}) => {
        const response = await fetch(`${apiHost}/api/cms/items/display-orders`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept-Language': getLanguage()
            },
            body: JSON.stringify(params.menuItems),
            credentials: 'include'
        });

        if (!response.ok) {
            const errorData = await response.json();
            return rejectWithValue(errorData);
        }

        try {
            return await response.json();
        } catch (error) {
            return {};
        }
    }
);

export const updateMenuItemsOrderSlice = createSlice({
    name: 'updateMenuItemsOrder',
    initialState: {
        isLoading: false,
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateMenuItemsOrder.pending, state => {
                state.isLoading = true;
            })
            .addCase(updateMenuItemsOrder.fulfilled, state => {
                state.isLoading = false;
            })
            .addCase(updateMenuItemsOrder.rejected, (state) => {
                state.isLoading = false;
            })
    }
})

export const switchMenuItemCategory = createAsyncThunk(
    'switchMenuItemCategory/switchMenuItemCategory',
    async ({menuItemId, newCategoryId}, {rejectWithValue}) => {
        const response = await fetch(`${apiHost}/api/cms/items/switch-category`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept-Language': getLanguage()
            },
            body: JSON.stringify({
                menuItemId: menuItemId,
                newCategoryId: newCategoryId
            }),
            credentials: 'include'
        });

        if (!response.ok) {
            const errorData = await response.json();
            return rejectWithValue(errorData);
        }

        try {
            return await response.json();
        } catch (error) {
            return {};
        }
    }
);

export const switchMenuItemCategorySlice = createSlice({
    name: 'switchMenuItemCategory',
    initialState: {
        isLoading: false,
        switchingError: null
    },
    reducers: {
        setSwitchingError: (state, action) => {
            state.switchingError = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(switchMenuItemCategory.pending, state => {
                state.isLoading = true;
            })
            .addCase(switchMenuItemCategory.fulfilled, state => {
                state.isLoading = false;
            })
            .addCase(switchMenuItemCategory.rejected, (state) => {
                state.isLoading = false;
            })
    }
})

export const getCategory = createAsyncThunk(
    'getCategory/getCategory',
    async (credentials, {rejectWithValue}) => {
        const response = await fetch(`${apiHost}/api/cms/categories/show`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept-Language': getLanguage()
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
                'Accept-Language': getLanguage()
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
            reorderCategoriesDialogActive: false,
            switchCategoryDialogActive: false,
            menuItemCategorySwitched: false,
            newDishFormActive: false,
            editDishFormActive: false,
            categoryForAction: null,
            menuItemForAction: null,
            activeRemovalType: null,
            category: {},
            dish: {},
            categories: null
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
            setReorderCategoriesDialogActive: (state, action) => {
                state.reorderCategoriesDialogActive = action.payload;
            },
            setSwitchCategoryDialogActive: (state, action) => {
                state.switchCategoryDialogActive = action.payload;
            },
            setMenuItemCategorySwitched: (state, action) => {
                state.menuItemCategorySwitched = action.payload;
            },
            setNewDishFormActive: (state, action) => {
                state.newDishFormActive = action.payload;
            },
            setEditDishFormActive: (state, action) => {
                state.editDishFormActive = action.payload;
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
                state.categoryForAction = null;
                state.menuItemForAction = null;
                state.activeRemovalType = null;
                state.category = {};
                state.dish = {};
                state.categories = null;
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
    setReorderCategoriesDialogActive,
    setSwitchCategoryDialogActive,
    setMenuItemCategorySwitched,
    setNewDishFormActive,
    setEditDishFormActive,
    setCategoryForAction,
    setMenuItemForAction,
    setActiveRemovalType,
    setCategory,
    setDish,
    setCategories,
    clearView
} = dishesCategoriesSlice.actions;

export const {setErrorData} = updateCategoriesOrderSlice.actions;
export const {setSwitchingError} = switchMenuItemCategorySlice.actions;

const dishesCategoriesReducer = combineReducers({
    view: dishesCategoriesSlice.reducer,
    getCategories: getCategoriesSlice.reducer,
    getCategory: getCategorySlice.reducer,
    updateMenuItemsOrder: updateMenuItemsOrderSlice.reducer,
    switchCategory: switchMenuItemCategorySlice.reducer,
    updateCategoriesOrder: updateCategoriesOrderSlice.reducer
});

export default dishesCategoriesReducer;