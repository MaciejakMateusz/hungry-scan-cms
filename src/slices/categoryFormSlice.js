import {combineReducers, createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {apiHost} from "../apiData";

export const postCategory = createAsyncThunk(
    'categoryFetch/postCategory',
    async ({action, transformName}, {getState, rejectWithValue}) => {
        const state = getState().categoryForm.form;
        const response = await fetch(`${apiHost}/api/cms/categories/${action}`, {
            method: action === 'add' ? 'POST' : 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: state.id,
                name: transformName(state.name),
                menuItems: state.dishes,
                available: state.available,
                displayOrder: state.displayOrder.value
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

export const postCategorySlice = createSlice(
    {
        name: 'postCategory',
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

export const categoryFormSlice = createSlice({
    name: 'form',
    initialState: {
        id: null,
        name: '',
        dishes: [],
        available: true,
        displayOrder: {
            value: 0,
            label: 0
        },
        displayOrders: [],
        categoryCreated: false,
        categoryUpdated: false,
        categoryRemoved: false,
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
        setCategoryCreated: (state, action) => {
            state.categoryCreated = action.payload;
        },
        setCategoryUpdated: (state, action) => {
            state.categoryUpdated = action.payload;
        },
        setCategoryRemoved: (state, action) => {
            state.categoryRemoved = action.payload;
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
            state.available = true;
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
    setCategoryCreated,
    setCategoryUpdated,
    setCategoryRemoved,
    setErrorMessage,
    setErrorData,
    clearForm
} = categoryFormSlice.actions

const categoryFormReducer = combineReducers({
    form: categoryFormSlice.reducer,
    postCategory: postCategorySlice.reducer
});

export default categoryFormReducer;