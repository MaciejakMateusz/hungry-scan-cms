import {combineReducers, createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {apiHost} from "../apiData";
import {getDecodedJwt} from "../utils";

export const postCategory = createAsyncThunk(
    'categoryFetch/postCategory',
    async (_, {getState, rejectWithValue}) => {
        const state = getState().categoryForm.form;
        const response = await fetch(`${apiHost}/api/cms/categories/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getDecodedJwt()}`
            },
            body: JSON.stringify({
                id: state.id,
                name: {
                    defaultTranslation: state.name,
                    translationEn: ''
                },
                menuItems: state.dishes,
                available: state.available.value,
                displayOrder: state.displayOrder.value
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            return rejectWithValue(errorData);
        }

        return await response.json();
    }
);

export const getCategoriesDisplayOrders = createAsyncThunk(
    'categoryFetch/getCategoriesDisplayOrders',
    async (_, {rejectWithValue}) => {
        const response = await fetch(`${apiHost}/api/cms/categories/display-orders`, {
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

export const categoryFetchSlice = createSlice(
    {
        name: 'categoryFetch',
        initialState: {
            isLoading: false
        },
        extraReducers: (builder) => {
            builder
                .addCase(postCategory.pending, state => {
                    state.isLoading = true;
                })
                .addCase(postCategory.fulfilled, state => {
                    state.isLoading = false;
                })
                .addCase(postCategory.rejected, (state) => {
                    state.isLoading = false;
                })
        }
    });

export const displayOrdersFetchSlice = createSlice(
    {
        name: 'getCategoriesDisplayOrders',
        initialState: {
            isLoading: false
        },
        extraReducers: (builder) => {
            builder
                .addCase(getCategoriesDisplayOrders.pending, state => {
                    state.isLoading = true;
                })
                .addCase(getCategoriesDisplayOrders.fulfilled, (state) => {
                    state.isLoading = false;
                })
                .addCase(getCategoriesDisplayOrders.rejected, (state) => {
                    state.isLoading = false;
                })
        }
    });

export const categoryFormSlice = createSlice({
    name: 'form',
    initialState: {
        id: null,
        name: '',
        dishes: [],
        available: {
            value: true,
            label: ''
        },
        displayOrder: {
            value: 0,
            label: 0
        },
        displayOrders: [],
        errorMessage: null,
        errorData: {}
    },
    reducers: {
        setId: (state, action) => {
            state.id = action.payload;
        },
        setName: (state, action) => {
            state.name = action.payload;
        },
        setDishes: (state, action) => {
            state.dishes = action.payload;
        },
        setAvailable: (state, action) => {
            state.available = action.payload;
        },
        setDisplayOrder: (state, action) => {
            state.displayOrder = action.payload;
        },
        setDisplayOrderValue: (state, action) => {
            state.displayOrder.label = action.payload;
        },
        setDisplayOrderLabel: (state, action) => {
            state.displayOrder.label = action.payload;
        },
        setDisplayOrders: (state, action) => {
            state.displayOrders = action.payload;
        },
        setErrorMessage: (state, action) => {
            state.errorMessage = action.payload;
        },
        setErrorData: (state, action) => {
            state.errorData = action.payload;
        },
        clearForm: state => {
            state.id = null;
            state.name = '';
            state.dishes = [];
            state.available = {
                value: true,
                label: ''
            };
            state.displayOrder = {
                value: 0,
                label: 0
            };
            state.errorData = {};
        }
    }
});

export const {
    setId,
    setName,
    setDishes,
    setAvailable,
    setDisplayOrder,
    setDisplayOrderValue,
    setDisplayOrderLabel,
    setDisplayOrders,
    setErrorMessage,
    setErrorData,
    clearForm
} = categoryFormSlice.actions

const categoryFormReducer = combineReducers({
    form: categoryFormSlice.reducer,
    categoryFetch: categoryFetchSlice.reducer,
    getCategoriesDisplayOrders: displayOrdersFetchSlice.reducer
});

export default categoryFormReducer;