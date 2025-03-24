import {combineReducers, createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {apiHost} from "../apiData";
import {formatPrice} from "../utils/utils";
import {getTranslation} from "../locales/langUtils";

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
    async (credentials, {getState, rejectWithValue}) => {
        const formState = getState().dishForm.form;
        const allergensState = getState().dishForm.fetchAllergens;
        const labelsState = getState().dishForm.fetchLabels;
        const dishAdditionsState = getState().dishAdditions.fetchIngredients;
        const labels = labelsState.chosenLabels?.map(label => label.value)
        const allergens = allergensState.chosenAllergens?.map(allergen => allergen.value)
        const additions = dishAdditionsState.chosenAdditions?.map(addition => addition.value)
        const response = await fetch(`${apiHost}/api/cms/items/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: formState.id,
                categoryId: formState.category && formState.category.id,
                displayOrder: formState.displayOrder,
                new: credentials.new,
                bestseller: credentials.bestseller,
                name: {
                    defaultTranslation: formState.name,
                    translationEn: ''
                },
                description: {
                    defaultTranslation: formState.description,
                    translationEn: ''
                },
                labels: labels,
                allergens: allergens,
                variants: formState.variants,
                additionalIngredients: additions,
                price: formState.price,
                imageName: formState.fileName,
                available: formState.available.value,
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
                const selectedLabels = action.payload;

                const selectedIds = new Set(selectedLabels?.map(item => item.value.id));
                const currentIds = new Set(state.chosenLabels?.map(item => item.value.id));

                const removedLabels = state.chosenLabels?.filter(item => !selectedIds.has(item.value.id));
                const addedLabels = selectedLabels?.filter(item => !currentIds.has(item.value.id));

                state.chosenLabels = selectedLabels;

                state.labels.push(...removedLabels?.map(item => ({
                    value: item.value,
                    label: getTranslation(item.value.name)
                })));

                state.labels = state.labels?.filter(label =>
                    !addedLabels.find(added => added.value.id === label.value.id));
                state.labels?.sort((a, b) =>
                    getTranslation(a.value.name).localeCompare(getTranslation(b.value.name))
                );
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

                    const formattedLabels = action.payload?.map(label => ({
                        value: label,
                        label: getTranslation(label.name)
                    }));

                    const chosenLabelsIds = new Set(state.chosenLabels?.map(item => item.value.id));

                    state.labels = formattedLabels.filter(label => !chosenLabelsIds.has(label.value.id));

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
                const selectedAllergens = action.payload;

                const selectedIds = new Set(selectedAllergens?.map(item => item.value.id));
                const currentIds = new Set(state.chosenAllergens?.map(item => item.value.id));

                const removedAllergens = state.chosenAllergens?.filter(item => !selectedIds.has(item.value.id));
                const addedAllergens = selectedAllergens?.filter(item => !currentIds.has(item.value.id));

                state.chosenAllergens = selectedAllergens;

                state.allergens.push(...removedAllergens?.map(item => ({
                    value: item.value,
                    label: getTranslation(item.value.name)
                })));

                state.allergens = state.allergens?.filter(allergen =>
                    !addedAllergens.find(added => added.value.id === allergen.value.id));
                state.allergens?.sort((a, b) =>
                    getTranslation(a.value.name).localeCompare(getTranslation(b.value.name))
                );
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

                    const formattedAllergens = action.payload?.map(allergen => ({
                        value: allergen,
                        label: getTranslation(allergen.name)
                    }));

                    const chosenAllergensIds = new Set(state.chosenAllergens?.map(item => item.value.id));

                    state.allergens = formattedAllergens?.filter(allergen =>
                        !chosenAllergensIds.has(allergen.value.id));
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
        banner: '',
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
            const category = action.payload;
            state.category = category
            if (category) {
                const displayOrders = category.menuItems?.map(menuItem => menuItem.displayOrder);
                const additional = displayOrders.length + 1;
                if (action.payload.isNew || category.id !== state.categoryId) {
                    state.displayOrders = [...displayOrders, additional];
                    state.displayOrder = additional;
                } else {
                    if (displayOrders.length === 0) {
                        state.displayOrders = [1];
                        state.displayOrder = 1;
                    } else {
                        state.displayOrders = displayOrders;
                        state.displayOrder = displayOrders.length;
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
        setAdditionalIngredients: (state, action) => {
            state.additionalIngredients = action.payload;
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
            state.banner = '';
            state.variants = [];
            state.price = formatPrice(0, true);
            state.file = {};
            state.fileName = null;
            state.chosenLabels = [];
            state.chosenAllergens = [];
            state.additionalIngredients = [];
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

export const {setChosenLabels, clearLabels} = fetchLabelsSlice.actions;
export const {setChosenAllergens, clearAllergens} = fetchAllergensSlice.actions;

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
    setAdditionalIngredients,
    setAvailable,
    setDisplayOrder,
    setDisplayOrders,
    setCreated,
    setCreatedBy,
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