import {combineReducers, createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {apiHost} from "../apiData";
import {formatPrice} from "../utils/utils";
import {getTranslation} from "../locales/langUtils";

export const fetchMenuItem = createAsyncThunk(
    'fetchMenuItem/fetchMenuItem',
    async ({id}, {rejectWithValue}) => {
        const response = await fetch(`${apiHost}/api/cms/items/show`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(id)
        });

        if (!response.ok) {
            const errorData = await response.json();
            return rejectWithValue(errorData);
        }

        return await response.json();
    }
);

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
            body: formData,
            credentials: 'include'
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
    async (params, {getState, rejectWithValue}) => {
        const formState = getState().dishForm.form;
        const allergensState = getState().dishForm.fetchAllergens;
        const labelsState = getState().dishForm.fetchLabels;
        const bannersState = getState().dishForm.fetchBanners;
        const dishAdditionsState = getState().dishAdditions.fetchIngredients;
        const banners = bannersState.chosenBanners?.map(banner => banner.value);
        const labels = labelsState.chosenLabels?.map(label => label.value);
        const allergens = allergensState.chosenAllergens?.map(allergen => allergen.value);
        const additions = dishAdditionsState.chosenAdditions?.map(addition => addition.value);
        const response = await fetch(`${apiHost}/api/cms/items/${params.action}`, {
            method: params.action === 'add' ? "POST" : "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: formState.id,
                categoryId: formState.category && formState.category.id,
                displayOrder: formState.displayOrder,
                name: {
                    defaultTranslation: formState.name,
                    translationEn: ''
                },
                description: {
                    defaultTranslation: formState.description,
                    translationEn: ''
                },
                banners: banners,
                labels: labels,
                allergens: allergens,
                variants: formState.variants,
                additionalIngredients: additions,
                price: formState.price,
                imageName: formState.fileName,
                available: formState.available,
                created: formState.created,
                createdBy: formState.createdBy
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

export const getBanners = createAsyncThunk(
    'fetchBanners/fetchBanners',
    async (_, {rejectWithValue}) => {
        const response = await fetch(`${apiHost}/api/cms/banners`, {
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

export const getLabels = createAsyncThunk(
    'fetchLabels/getLabels',
    async (_, {rejectWithValue}) => {
        const response = await fetch(`${apiHost}/api/cms/labels`, {
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

export const getAllergens = createAsyncThunk(
    'fetchAllergens/getAllergens',
    async (_, {rejectWithValue}) => {
        const response = await fetch(`${apiHost}/api/cms/allergens`, {
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

export const fetchMenuItemSlice = createSlice(
    {
        name: 'getLabels',
        initialState: {
            isLoading: false,
            error: null,
            data: null
        },
        extraReducers: (builder) => {
            builder
                .addCase(fetchMenuItem.pending, state => {
                    state.isLoading = true;
                })
                .addCase(fetchMenuItem.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.data = action.payload;
                })
                .addCase(fetchMenuItem.rejected, (state, action) => {
                    state.isLoading = false;
                    state.errorData = action.payload;
                })
        }
    });

export const fetchBannersSlice = createSlice(
    {
        name: 'getBanners',
        initialState: {
            isLoading: false,
            banners: [],
            chosenBanners: []
        },
        reducers: {
            setChosenBanners: (state, action) => {
                state.chosenBanners = action.payload;
            },
            clearBanners: (state) => {
                state.labels = [];
                state.chosenLabels = [];
            }
        },
        extraReducers: (builder) => {
            builder
                .addCase(getBanners.pending, state => {
                    state.isLoading = true;
                })
                .addCase(getBanners.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.banners = action.payload?.map(banner => ({
                        value: banner,
                        label: getTranslation(banner.name)
                    }));
                    state.banners.sort((a, b) =>
                        getTranslation(a.value.name).localeCompare(getTranslation(b.value.name))
                    );
                })
                .addCase(getBanners.rejected, (state) => {
                    state.isLoading = false;
                })
        }
    });

export const fetchLabelsSlice = createSlice(
    {
        name: 'getLabels',
        initialState: {
            isLoading: false,
            labels: [],
            chosenLabels: []
        },
        reducers: {
            setChosenLabels: (state, action) => {
                state.chosenLabels = action.payload;
            },
            clearLabels: (state) => {
                state.labels = [];
                state.chosenLabels = [];
            }
        },
        extraReducers: (builder) => {
            builder
                .addCase(getLabels.pending, state => {
                    state.isLoading = true;
                })
                .addCase(getLabels.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.labels = action.payload?.map(label => ({
                        value: label,
                        label: getTranslation(label.name)
                    }));
                    state.labels.sort((a, b) =>
                        getTranslation(a.value.name).localeCompare(getTranslation(b.value.name))
                    );
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
            allergens: [],
            chosenAllergens: []
        },
        reducers: {
            setChosenAllergens: (state, action) => {
                state.chosenAllergens = action.payload;
            },
            clearAllergens: (state) => {
                state.allergens = [];
                state.chosenAllergens = [];
            }
        },
        extraReducers: (builder) => {
            builder
                .addCase(getAllergens.pending, state => {
                    state.isLoading = true;
                })
                .addCase(getAllergens.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.allergens = action.payload?.map(allergen => ({
                        value: allergen,
                        label: getTranslation(allergen.name)
                    }));
                    state.allergens?.sort((a, b) =>
                        getTranslation(a.value.name).localeCompare(getTranslation(b.value.name))
                    );
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
        banners: [],
        variants: [],
        price: formatPrice(0, true),
        fileName: null,
        additionalIngredients: [],
        available: true,
        displayOrder: 0,
        displayOrders: [],
        created: null,
        createdBy: null,
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
            state.category = action.payload;
        },
        setCategoryId: (state, action) => {
            state.categoryId = action.payload;
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
        setAvailable: (state, action) => {
            state.available = action.payload;
        },
        setDisplayOrder: (state, action) => {
            state.displayOrder = action.payload;
        },
        setCreated: (state, action) => {
            state.created = action.payload;
        },
        setCreatedBy: (state, action) => {
            state.createdBy = action.payload;
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
            state.variants = [];
            state.price = formatPrice(0, true);
            state.file = {};
            state.fileName = null;
            state.chosenLabels = [];
            state.chosenAllergens = [];
            state.available = true;
            state.displayOrder = 0;
            state.displayOrders = [];
            state.created = null;
            state.createdBy = null;
            state.errorMessage = null;
            state.errorData = {};
        }
    }
});

export const {setChosenBanners, clearBanners} = fetchBannersSlice.actions;
export const {setChosenLabels, clearLabels} = fetchLabelsSlice.actions;
export const {setChosenAllergens, clearAllergens} = fetchAllergensSlice.actions;

export const {
    setId,
    setName,
    setDescription,
    setCategory,
    setCategoryId,
    setVariants,
    setPrice,
    setFileName,
    clearFileName,
    setAvailable,
    setDisplayOrder,
    setCreated,
    setCreatedBy,
    setErrorMessage,
    setErrorData,
    clearForm
} = dishFormSlice.actions

const dishFormReducer = combineReducers({
    form: dishFormSlice.reducer,
    fetchMenuItem: fetchMenuItemSlice.reducer,
    fetchBanners: fetchBannersSlice.reducer,
    fetchLabels: fetchLabelsSlice.reducer,
    fetchAllergens: fetchAllergensSlice.reducer,
    postImage: postImageSlice,
    postDish: postDishSlice
});

export default dishFormReducer;