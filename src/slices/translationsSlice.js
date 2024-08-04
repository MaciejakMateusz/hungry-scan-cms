import {combineReducers, createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {apiHost} from "../apiData";
import {getDecodedJwt} from "../utils";

export const getAutoTranslation = createAsyncThunk(
    'translations/getAutoTranslations',
    async (credentials, {rejectWithValue}) => {
        const response = await fetch(`https://translation.googleapis.com/v3/projects/translations/locations/global:translateText?key=YOUR_API_KEY`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                q: credentials.text,
                source: "pl",
                target: "en",
                format: "text",
                alternatives: 5,
                api_key: ""
            })
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
    async (credentials, {getState, rejectWithValue}) => {
        const state = getState().translations.view;
        const requestBody = [state.activeRecord?.name, state.activeRecord?.description];
        console.log(requestBody);
        const response = await fetch(`${apiHost}/api/cms/translatable/save-all`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getDecodedJwt()}`,
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorData = await response.json();
            return rejectWithValue(errorData);
        }

        return await response.json();
    }
);

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
                Authorization: `Bearer ${getDecodedJwt()}`,
            }
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

export const translationsSlice = createSlice({
    name: 'view',
    initialState: {
        activeRecordId: null,
        activeRecord: null,
        records: [],
        chosenGroup: null,
        errorData: null
    },
    reducers: {
        setActiveRecordId: (state, action) => {
            state.activeRecordId = action.payload;
        },
        setActiveRecord: (state, action) => {
            state.activeRecord = action.payload;
        },
        setRecordName: (state, action) => {
            state.activeRecord = {
                ...state?.activeRecord,
                name: {
                    ...state.activeRecord?.name,
                    translationEn: action.payload
                }
            }
        },
        setRecordDescription: (state, action) => {
            state.activeRecord = {
                ...state?.activeRecord,
                description: {
                    ...state.activeRecord?.description,
                    translationEn: action.payload
                }
            }
        },
        setRecords: (state, action) => {
            state.records = action.payload;
        },
        setChosenGroup: (state, action) => {
            state.chosenGroup = action.payload;
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
    setRecordName,
    setRecordDescription,
    setRecords,
    setChosenGroup,
    setErrorData,
    clearView
} = translationsSlice.actions;

const translationsReducer = combineReducers({
    view: translationsSlice.reducer,
    autoTranslate: getAutoTranslationSlice.reducer,
    postTranslatables: postTranslatablesSlice.reducer,
    getAllVariants: getAllVariantsSlice.reducer,
    getAllIngredients: getAllIngredientsSlice.reducer
});

export default translationsReducer;