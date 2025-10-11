import {combineReducers, createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {apiHost} from "../apiData";
import {getLanguage} from "../locales/langUtils";

export const getAutoTranslation = createAsyncThunk(
    'translations/getAutoTranslations',
    async ({text, targetLanguage}, {rejectWithValue}) => {
        const sourceLanguage = getLanguage().toUpperCase();
        const response = await fetch(`${apiHost}/api/cms/translatable/translate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                text: [text],
                source_lang: sourceLanguage,
                target_lang: targetLanguage.toUpperCase(),
                context: "Restaurant CMS - Translate names and descriptions for categories, dishes, ingredients, and variants."
            }),
            credentials: 'include'
        });

        if (!response.ok) {
            const errorData = await response.json();
            return rejectWithValue(errorData);
        }

        return await response.json();
    }
);

export const getAutoTranslationSlice = createSlice(
    {
        name: 'getAutoTranslation',
        initialState: {
            isLoading: false,
        },
        extraReducers: (builder) => {
            builder
                .addCase(getAutoTranslation.pending, state => {
                    state.isLoading = true;
                })
                .addCase(getAutoTranslation.fulfilled, state => {
                    state.isLoading = false;
                })
                .addCase(getAutoTranslation.rejected, state => {
                    state.isLoading = false;
                })
        }
    });

export const postTranslatables = createAsyncThunk(
    'translations/postTranslatables',
    async ({targetLanguage}, {getState, rejectWithValue}) => {
        const state = getState().translations.view;
        const requestBody = mapTranslatables(state, targetLanguage);
        const response = await fetch(`${apiHost}/api/cms/translatable/save-all`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
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

const mapTranslatables = (state, targetLanguage) => {
    const currentSystemLanguage = getLanguage();
    let resultTranslatables = [];

    if ('description' in state.activeRecord) {
        resultTranslatables.push({
            ...state.activeRecord?.name,
            [currentSystemLanguage]: state.sourceName,
            [targetLanguage]: state.targetName
        });
        resultTranslatables.push({
                ...state.activeRecord?.description,
                [currentSystemLanguage]: state.sourceDescription,
                [targetLanguage]: state.targetDescription
        });
    } else if(!('description' in state.activeRecord) && !state.activeRecord.message) {
        resultTranslatables.push({
            ...state.activeRecord?.name,
            [currentSystemLanguage]: state.sourceName,
            [targetLanguage]: state.targetName,
        });
    } else if ('message' in state.activeRecord) {
        resultTranslatables.push({
            ...state.activeRecord?.message,
            [currentSystemLanguage]: state.sourceWelcomeSlogan,
            [targetLanguage]: state.targetWelcomeSlogan,
        });
    }

    return resultTranslatables;
}

export const postTranslatablesSlice = createSlice(
    {
        name: 'postTranslatables',
        initialState: {
            isLoading: false,
        },
        extraReducers: (builder) => {
            builder
                .addCase(postTranslatables.pending, state => {
                    state.isLoading = true;
                })
                .addCase(postTranslatables.fulfilled, state => {
                    state.isLoading = false;
                })
                .addCase(postTranslatables.rejected, state => {
                    state.isLoading = false;
                })
        }
    });

export const getAllVariants = createAsyncThunk(
    'translations/getAllVariants',
    async (credentials, {rejectWithValue}) => {
        const response = await fetch(`${apiHost}/api/cms/variants`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
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

export const getAllVariantsSlice = createSlice(
    {
        name: 'getAllVariants',
        initialState: {
            isLoading: false,
        },
        extraReducers: (builder) => {
            builder
                .addCase(getAllVariants.pending, state => {
                    state.isLoading = true;
                })
                .addCase(getAllVariants.fulfilled, state => {
                    state.isLoading = false;
                })
                .addCase(getAllVariants.rejected, state => {
                    state.isLoading = false;
                })
        }
    });

export const getAllIngredients = createAsyncThunk(
    'translations/getAllIngredients',
    async (_, {rejectWithValue}) => {
        const response = await fetch(`${apiHost}/api/cms/ingredients`, {
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

export const getAllIngredientsSlice = createSlice(
    {
        name: 'getAllIngredients',
        initialState: {
            isLoading: false,
        },
        extraReducers: (builder) => {
            builder
                .addCase(getAllIngredients.pending, state => {
                    state.isLoading = true;
                })
                .addCase(getAllIngredients.fulfilled, state => {
                    state.isLoading = false;
                })
                .addCase(getAllIngredients.rejected, state => {
                    state.isLoading = false;
                })
        }
    });

export const getAllMenus = createAsyncThunk(
    'translations/getAllMenus',
    async (_, {rejectWithValue}) => {
        const response = await fetch(`${apiHost}/api/cms/menus`, {
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

export const getAllMenusSlice = createSlice(
    {
        name: 'getAllMenus',
        initialState: {
            isLoading: false,
        },
        extraReducers: (builder) => {
            builder
                .addCase(getAllMenus.pending, state => {
                    state.isLoading = true;
                })
                .addCase(getAllMenus.fulfilled, state => {
                    state.isLoading = false;
                })
                .addCase(getAllMenus.rejected, state => {
                    state.isLoading = false;
                })
        }
    });

export const translationsSlice = createSlice({
    name: 'view',
    initialState: {
        activeRecordId: null,
        activeRecord: null,
        dishesCategories: [],
        variants: [],
        additions: [],
        menus: [],
        chosenGroup: null,
        chosenDestinationLanguage: {},
        targetName: '',
        targetDescription: '',
        targetWelcomeSlogan: '',
        sourceName: '',
        sourceDescription: '',
        sourceWelcomeSlogan: '',
        saveSuccess: false,
        errorData: null
    },
    reducers: {
        setActiveRecordId: (state, action) => {
            state.activeRecordId = action.payload;
        },
        setActiveRecord: (state, action) => {
            state.activeRecord = action.payload;
        },
        setDishesCategories: (state, action) => {
            state.dishesCategories = action.payload;
        },
        setVariants: (state, action) => {
            state.variants = action.payload;
        },
        setAdditions: (state, action) => {
            state.additions = action.payload;
        },
        setMenus: (state, action) => {
            state.menus = action.payload;
        },
        setChosenGroup: (state, action) => {
            state.chosenGroup = action.payload;
        },
        setChosenDestinationLanguage: (state, action) => {
            state.chosenDestinationLanguage = action.payload;
        },
        setTargetName: (state, action) => {
            state.targetName = action.payload;
        },
        setTargetDescription: (state, action) => {
            state.targetDescription = action.payload;
        },
        setTargetWelcomeSlogan: (state, action) => {
            state.targetWelcomeSlogan = action.payload;
        },
        setSourceName: (state, action) => {
            state.sourceName = action.payload;
        },
        setSourceDescription: (state, action) => {
            state.sourceDescription = action.payload;
        },
        setSourceWelcomeSlogan: (state, action) => {
            state.sourceWelcomeSlogan = action.payload;
        },
        setSaveSuccess: (state, action) => {
            state.saveSuccess = action.payload;
        },
        setErrorData: (state, action) => {
            state.errorData = action.payload;
        },
        clearView: state => {
            state.activeRecordId = null;
            state.activeRecord = null;
            state.records = [];
            state.chosenGroup = null;
            state.errorData = null;
        }
    }
});


export const {
    setActiveRecordId,
    setActiveRecord,
    setDishesCategories,
    setVariants,
    setAdditions,
    setMenus,
    setChosenGroup,
    setChosenDestinationLanguage,
    setTargetName,
    setTargetDescription,
    setTargetWelcomeSlogan,
    setSourceName,
    setSourceDescription,
    setSourceWelcomeSlogan,
    setSaveSuccess,
    setErrorData,
    clearView
} = translationsSlice.actions;

const translationsReducer = combineReducers({
    view: translationsSlice.reducer,
    autoTranslate: getAutoTranslationSlice.reducer,
    postTranslatables: postTranslatablesSlice.reducer,
    getAllVariants: getAllVariantsSlice.reducer,
    getAllMenus: getAllMenusSlice.reducer,
    getAllIngredients: getAllIngredientsSlice.reducer
});

export default translationsReducer;