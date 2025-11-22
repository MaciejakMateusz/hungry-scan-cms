import {combineReducers, createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {apiHost} from "../apiData";
import {getLanguage} from "../locales/langUtils";

export const fetchVariants = createAsyncThunk(
    'variants/fetchVariants',
    async (credentials, {getState, rejectWithValue}) => {
        let state;
        let dish;
        if (!credentials.dish) {
            state = getState().variants.view;
            dish = state?.dish;
        } else {
            dish = credentials.dish
        }

        if (!dish) {
            return;
        }

        const response = await fetch(`${apiHost}/api/cms/variants/item`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Accept-Language': getLanguage()
            },
            body: dish.id,
            credentials: 'include'
        });

        if (!response.ok) {
            const errorData = await response.json();
            return rejectWithValue(errorData);
        }

        return await response.json();
    }
);

export const fetchVariantsSlice = createSlice(
    {
        name: 'fetchVariants',
        initialState: {
            isLoading: false,
            variants: null
        },
        extraReducers: (builder) => {
            builder
                .addCase(fetchVariants.pending, state => {
                    state.isLoading = true;
                })
                .addCase(fetchVariants.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.variants = action.payload;
                })
                .addCase(fetchVariants.rejected, state => {
                    state.isLoading = false;
                })
        }
    });

export const variantsSlice = createSlice({
    name: 'view',
    initialState: {
        filteringActive: false,
        filterValue: '',
        filteredItems: null,
        filterExpanded: false,
        category: null,
        dish: null,
        variantDialogActive: false,
        variantToRemove: null,
        isNewVariant: true,
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
        setCategory: (state, action) => {
            state.category = action.payload;
        },
        setDish: (state, action) => {
            state.dish = action.payload;
        },
        setVariantDialogActive: (state, action) => {
            state.variantDialogActive = action.payload;
        },
        setVariantToRemove: (state, action) => {
            state.variantToRemove = action.payload;
        },
        setIsNewVariant: (state, action) => {
            state.isNewVariant = action.payload;
        },
        clearView: state => {
            state.filteringActive = false;
            state.filterValue = '';
            state.filteredItems = null;
            state.filterExpanded = false;
            state.category = null;
            state.dish = null;
            state.variantDialogActive = false;
            state.variantToRemove = null;
            state.isNewVariant = true;
        }
    }
});

export const variantFormSlice = createSlice({
    name: 'form',
    initialState: {
        id: null,
        variant: null,
        displayOrder: {value: 1, label: 1},
        name: '',
        price: '0.00',
        available: true
    },
    reducers: {
        setId: (state, action) => {
            state.id = action.payload;
        },
        setVariant: (state, action) => {
            state.variant = action.payload;
        },
        setDisplayOrder: (state, action) => {
            state.displayOrder = action.payload;
        },
        setName: (state, action) => {
            state.name = action.payload;
        },
        setPrice: (state, action) => {
            state.price = action.payload;
        },
        setAvailable: (state, action) => {
            state.available = action.payload;
        },
        clearForm: state => {
            state.id = null;
            state.variant = null;
            state.displayOrder = {value: 1, label: 1};
            state.name = '';
            state.price = '0.00';
            state.available = true;
        }
    }
});

export const {
    setVariantDialogActive,
    setVariantToRemove,
    setIsNewVariant,
    clearView
} = variantsSlice.actions;

export const {
    setVariant,
    setName,
    setAvailable,
    clearForm
} = variantFormSlice.actions;


const variantsReducer = combineReducers({
    view: variantsSlice.reducer,
    fetchVariants: fetchVariantsSlice.reducer,
    form: variantFormSlice.reducer
});

export default variantsReducer;