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

export const postDish = createAsyncThunk(
    'postDish/postDish',
    async ({action, file, translatableTransformers}, {getState, rejectWithValue}) => {
        const s = getState();
        const form = s.dishForm.form;
        const preparedVariants = form.variants.map(variant => {
            if (typeof variant.id !== "number") {
                return {...variant, id: null}
            }
            return variant;
        });
        const payload = {
            id: form.id,
            categoryId: form.category?.id,
            displayOrder: form.displayOrder,
            name: translatableTransformers.transformName(form.name),
            description: translatableTransformers.transformDescription(form.description),
            price: form.price,
            promoPrice: form.promoPrice,
            available: form.available,
            created: form.created,
            createdBy: form.createdBy,
            variants: preparedVariants,
            banners: s.dishForm.fetchBanners.chosenBanners.map(b => b.value),
            labels: s.dishForm.fetchLabels.chosenLabels.map(l => l.value),
            allergens: s.dishForm.fetchAllergens.chosenAllergens.map(a => a.value),
            additionalIngredients:
                s.dishAdditions.fetchIngredients.chosenAdditions.map(i => i.value)
        };


        const menuItemBlob = new Blob(
            [JSON.stringify(payload)],
            {type: "application/json"}
        );
        const formData = new FormData();
        formData.append("menuItem", menuItemBlob);
        formData.append("image", file);

        const res = await fetch(`${apiHost}/api/cms/items/${action}`, {
            method: action === 'add' ? 'POST' : 'PATCH',
            credentials: 'include',
            body: formData
        });

        if (!res.ok) {
            const err = await res.json();
            return rejectWithValue(err);
        }


        return await res.json().catch(() => {
        });
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
                state.banners = [];
                state.chosenBanners = [];
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
        activeTab: 'information',
        id: null,
        name: '',
        description: '',
        category: null,
        categoryId: null,
        banners: [],
        variants: [],
        price: formatPrice(0, true),
        promoPrice: formatPrice(0, true),
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
        setActiveTab: (state, action) => {
            state.activeTab = action.payload;
        },
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
        setPromoPrice: (state, action) => {
            state.promoPrice = action.payload;
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
            state.activeTab = 'information';
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
    setActiveTab,
    setId,
    setName,
    setDescription,
    setCategory,
    setCategoryId,
    setVariants,
    setPrice,
    setPromoPrice,
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
    postDish: postDishSlice
});

export default dishFormReducer;