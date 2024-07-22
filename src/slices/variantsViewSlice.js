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
        const state = getState().variants.view;
        if (!state.dish) {
            return;
        }
        const response = await fetch(`${apiHost}/api/cms/variants/item`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getDecodedJwt()}`,
            },
            body: state.dish.id
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

export const variantsViewSlice = createSlice({
    name: 'view',
    initialState: {
        searchActive: false,
        filter: null,
        category: null,
        dish: null,
        variantDialogActive: false,
        isNewVariant: true,
    },
    reducers: {
        setSearchActive: (state, action) => {
            state.searchActive = action.payload;
        },
        setFilter: (state, action) => {
            state.filter = action.payload;
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
        setIsNewVariant: (state, action) => {
            state.isNewVariant = action.payload;
        },
        resetViewData: state => {
            state.variantDialogActive = false;
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
            state.displayOrder = {value: 1, label: 1};
            state.name = '';
            state.price = '0.00';
            state.available = true;
        }
    }
});

export const {
    setSearchActive,
    setFilter,
    setCategory,
    setDish,
    setVariantDialogActive,
    setIsNewVariant,
    resetViewData
} = variantsViewSlice.actions;

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
    view: variantsViewSlice.reducer,
    fetchVariants: fetchVariantsSlice.reducer,
    form: variantFormSlice.reducer,
    postVariant: postVariantSlice.reducer
});

export default variantsReducer;