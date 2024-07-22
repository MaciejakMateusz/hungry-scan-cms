import {combineReducers, createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {apiHost} from "../apiData";
import {getDecodedJwt} from "../utils";

export const postImage = createAsyncThunk(
    'postImage/postImage',
    async (credentials, {rejectWithValue}) => {
        if (!credentials.file) {
            return;
        }

        const formData = new FormData();
        formData.append("file", credentials.file);

        const response = await fetch(`${apiHost}/api/cms/images`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${getDecodedJwt()}`,
            },
            body: formData
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            return rejectWithValue(errorData || {message: 'Failed to upload image'});
        }

        try {
            return await response.json();
        } catch (error) {
            return {};
        }
    }
);

export const postDish = createAsyncThunk(
    'postDish/postDish',
    async (credentials, {getState, rejectWithValue}) => {
        const state = getState().dishForm.form;
        const response = await fetch(`${apiHost}/api/cms/items/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getDecodedJwt()}`,
            },
            body: JSON.stringify({
                id: state.id,
                categoryId: state.category && state.category.value.id,
                displayOrder: state.displayOrder.value,
                new: credentials.new,
                bestseller: credentials.bestseller,
                name: {
                    defaultTranslation: state.name,
                    translationEn: ''
                },
                description: {
                    defaultTranslation: state.description,
                    translationEn: ''
                },
                labels: state.chosenLabels,
                allergens: state.chosenAllergens,
                variants: state.variants,
                additionalIngredients: state.chosenAdditions,
                price: state.price,
                imageName: state.fileName,
                available: state.available.value,
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            return rejectWithValue(errorData);
        }

        return await response.json();
    }
);

export const getLabels = createAsyncThunk(
    'fetchLabels/getLabels',
    async (_, {rejectWithValue}) => {
        const response = await fetch(`${apiHost}/api/cms/labels`, {
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

export const getAllergens = createAsyncThunk(
    'fetchAllergens/getAllergens',
    async (_, {rejectWithValue}) => {
        const response = await fetch(`${apiHost}/api/cms/allergens`, {
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

export const postImageSlice = createSlice(
    {
        name: 'postImage',
        initialState: {
            isLoading: false
        },
        extraReducers: (builder) => {
            builder
                .addCase(postImage.pending, state => {
                    state.isLoading = true;
                })
                .addCase(postImage.fulfilled, (state) => {
                    state.isLoading = false;
                })
                .addCase(postImage.rejected, (state) => {
                    state.isLoading = false;
                })
        }
    });

export const postDishSlice = createSlice(
    {
        name: 'postDish',
        initialState: {
            isLoading: false,
        },
        extraReducers: (builder) => {
            builder
                .addCase(postDish.pending, state => {
                    state.isLoading = true;
                })
                .addCase(postDish.fulfilled, (state) => {
                    state.isLoading = false;
                })
                .addCase(postDish.rejected, (state) => {
                    state.isLoading = false;
                })
        }
    });

export const fetchLabelsSlice = createSlice(
    {
        name: 'getLabels',
        initialState: {
            isLoading: false,
            labels: []
        },
        extraReducers: (builder) => {
            builder
                .addCase(getLabels.pending, state => {
                    state.isLoading = true;
                })
                .addCase(getLabels.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.labels = action.payload;
                })
                .addCase(getLabels.rejected, (state) => {
                    state.isLoading = false;
                })
        }
    });

export const fetchAllergensSlice = createSlice(
    {
        name: 'getAllergens',
        initialState: {
            isLoading: false,
            allergens: []
        },
        extraReducers: (builder) => {
            builder
                .addCase(getAllergens.pending, state => {
                    state.isLoading = true;
                })
                .addCase(getAllergens.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.allergens = action.payload;
                })
                .addCase(getAllergens.rejected, (state) => {
                    state.isLoading = false;
                })
        }
    });

export const dishFormSlice = createSlice({
    name: 'form',
    initialState: {
        id: null,
        name: '',
        description: '',
        category: null,
        categoryId: null,
        banner: '',
        variants: [],
        price: "0.00",
        fileName: null,
        chosenLabels: [],
        chosenAllergens: [],
        additionalIngredients: [],
        chosenAdditions: [],
        available: {
            value: true,
            label: ''
        },
        displayOrder: 0,
        displayOrders: [],
        isAdditionsViewActive: false,
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
        setDescription: (state, action) => {
            state.description = action.payload;
        },
        setCategory: (state, action) => {
            const category = action.payload.category;
            state.category = category
            if (category) {
                const displayOrders = category.value.menuItems.map(menuItem => menuItem.displayOrder);
                const additional = displayOrders.length + 1;
                if (action.payload.isNew || category.value.id !== state.categoryId) {
                    state.displayOrders = [...displayOrders, additional];
                    state.displayOrder = {value: additional, label: additional};
                } else {
                    if (displayOrders.length === 0) {
                        state.displayOrders = [1];
                        state.displayOrder = {value: 1, label: 1};
                    } else {
                        state.displayOrders = displayOrders;
                        state.displayOrder = {value: displayOrders.length, label: displayOrders.length};
                    }
                }
            } else {
                state.category = null;
                state.displayOrder = 0;
                state.displayOrders = [];
            }
        },
        setCategoryId: (state, action) => {
            state.categoryId = action.payload;
        },
        setBanner: (state, action) => {
            state.banner = action.payload || null;
        },
        setVariants: (state, action) => {
            state.variants = action.payload;
        },
        setPrice: (state, action) => {
            state.price = action.payload;
        },
        setFileName: (state, action) => {
            state.fileName = action.payload;
        },
        clearFileName: state => {
            state.fileName = null;
        },
        setChosenLabels: (state, action) => {
            state.chosenLabels = action.payload;
        },
        setChosenAllergens: (state, action) => {
            state.chosenAllergens = action.payload;
        },
        setAdditionalIngredients: (state, action) => {
            state.additionalIngredients = action.payload;
        },
        setChosenAdditions: (state, action) => {
            state.chosenAdditions = action.payload;
        },
        addChosenAddition: (state, action) => {
            state.chosenAdditions.push(action.payload);
        },
        removeChosenAddition: (state, action) => {
            state.chosenAdditions = state.chosenAdditions.filter(a => a.id !== action.payload.id)
        },
        setAvailable: (state, action) => {
            state.available = action.payload;
        },
        setDisplayOrder: (state, action) => {
            state.displayOrder = action.payload || 0;
        },
        setDisplayOrders: (state, action) => {
            state.displayOrders = action.payload;
        },
        setIsAdditionsViewActive: (state, action) => {
            state.isAdditionsViewActive = action.payload;
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
            state.description = '';
            state.category = null;
            state.banner = '';
            state.variants = [];
            state.price = "0.00";
            state.file = {};
            state.fileName = null;
            state.chosenLabels = [];
            state.chosenAllergens = [];
            state.additionalIngredients = [];
            state.chosenAdditions = [];
            state.available = {
                value: true,
                label: ''
            };
            state.displayOrder = 0;
            state.displayOrders = [];
            state.isAdditionsViewActive = false;
            state.errorMessage = null;
            state.errorData = {};
        }
    }
});

export const {
    setId,
    setName,
    setDescription,
    setCategory,
    setCategoryId,
    setBanner,
    setVariants,
    setPrice,
    setFileName,
    clearFileName,
    setChosenLabels,
    setChosenAllergens,
    setAdditionalIngredients,
    setAvailable,
    setDisplayOrder,
    setDisplayOrders,
    setIsAdditionsViewActive,
    setChosenAdditions,
    addChosenAddition,
    removeChosenAddition,
    setErrorMessage,
    setErrorData,
    clearForm
} = dishFormSlice.actions

const dishFormReducer = combineReducers({
    form: dishFormSlice.reducer,
    fetchLabels: fetchLabelsSlice.reducer,
    fetchAllergens: fetchAllergensSlice.reducer,
    postImage: postImageSlice,
    postDish: postDishSlice
});

export default dishFormReducer;