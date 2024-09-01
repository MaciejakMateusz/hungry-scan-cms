import {combineReducers, createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {apiHost} from "../apiData";
import {getDecodedJwt} from "../utils";

export const postVariant = createAsyncThunk(
    'variants/postVariant',
    async (_, {getState, rejectWithValue}) => {
        const state = getState().variants.form;
        const viewState = getState().variants.view;
        const response = await fetch(`${apiHost}/api/cms/variants/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getDecodedJwt()}`
            },
            body: JSON.stringify({
                id: state.id,
                menuItem: viewState.dish,
                displayOrder: state.displayOrder.value,
                name: {
                    defaultTranslation: state.name,
                    translationEn: ''
                },
                price: state.price,
                available: state.available.value
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            return rejectWithValue(errorData);
        }

        return await response.json();
    }
);

export const postVariantSlice = createSlice(
    {
        name: 'postVariant',
        initialState: {
            isLoading: false,
            errorData: {},
        },
        reducers: {
            setErrorData: (state, action) => {
                state.errorData = action.payload;
            }
        },
        extraReducers: (builder) => {
            builder
                .addCase(postVariant.pending, state => {
                    state.isLoading = true;
                })
                .addCase(postVariant.fulfilled, state => {
                    state.isLoading = false;
                    state.errorData = {};
                })
                .addCase(postVariant.rejected, (state, action) => {
                    state.isLoading = false;
                    state.errorData = action.payload;
                })
        }
    });

export const fetchVariants = createAsyncThunk(
    'variants/fetchVariants',
    async (credentials, {getState, rejectWithValue}) => {
        let state;
        let dish;
        if(!credentials.dish) {
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
                Authorization: `Bearer ${getDecodedJwt()}`,
            },
            body: dish.id
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
        reducers: {
            clearVariants: state => {
                state.variants = null;
            }
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
        resetVariantData: state => {
            state.variantDialogActive = false;
            state.isNewVariant = true;
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
    setFilteringActive,
    setFilterValue,
    setFilteredItems,
    setFilterExpanded,
    setCategory,
    setDish,
    setVariantDialogActive,
    setVariantToRemove,
    setIsNewVariant,
    resetVariantData,
    clearView
} = variantsSlice.actions;

export const {
    clearVariants
} = fetchVariantsSlice.actions;

export const {
    setId,
    setVariant,
    setDisplayOrder,
    setName,
    setPrice,
    setAvailable,
    clearForm
} = variantFormSlice.actions;

export const {setErrorData} = postVariantSlice.actions;

const variantsReducer = combineReducers({
    view: variantsSlice.reducer,
    fetchVariants: fetchVariantsSlice.reducer,
    form: variantFormSlice.reducer,
    postVariant: postVariantSlice.reducer
});

export default variantsReducer;