import {combineReducers, createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {apiHost} from "../apiData";
import {updateTranslatable} from "../locales/langUtils";

export const fetchThemeHexes = createAsyncThunk(
    'fetchThemeHexes/fetchThemeHexes',
    async (_, {rejectWithValue}) => {
        const response = await fetch(`${apiHost}/api/cms/menus/themes`, {
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

export const postPersonalization = createAsyncThunk(
    'postPersonalization/postPersonalization',
    async ({activeMenu}, {getState, rejectWithValue}) => {
        const state = getState();
        const form = state.personalization.form;
        const post = state.personalization.postPersonalization;

        if (post.errorData) {
            return rejectWithValue(post.errorData);
        }

        const response = await fetch(`${apiHost}/api/cms/menus/update`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: activeMenu.value.id,
                message: updateTranslatable(activeMenu.value.message, form.welcomeSlogan),
                theme: form.theme,
                bannerIconVisible: form.bannerIconVisible,
                color: activeMenu.value.color,
                name: activeMenu.value.name,
                standard: activeMenu.value.standard
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

export const postPersonalizationSlice = createSlice(
    {
        name: 'postPersonalization',
        initialState: {
            isLoading: false,
            errorData: null,
        },
        reducers: {
            setErrorData: (state, action) => {
                state.errorData = action.payload;
            }
        },
        extraReducers: (builder) => {
            builder
                .addCase(postPersonalization.pending, state => {
                    state.isLoading = true;
                })
                .addCase(postPersonalization.fulfilled, (state) => {
                    state.isLoading = false;
                })
                .addCase(postPersonalization.rejected, (state) => {
                    state.isLoading = false;
                })
        }
    });

export const fetchThemeHexesSlice = createSlice(
    {
        name: 'fetchThemeHexes',
        initialState: {
            isLoading: false,
            error: null,
            themeHexes: null
        },
        extraReducers: (builder) => {
            builder
                .addCase(fetchThemeHexes.pending, state => {
                    state.isLoading = true;
                })
                .addCase(fetchThemeHexes.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.themeHexes = action.payload;
                })
                .addCase(fetchThemeHexes.rejected, (state, action) => {
                    state.isLoading = false;
                    state.errorData = action.payload;
                })
        }
    });

export const personalizationFormSlice = createSlice({
    name: 'form',
    initialState: {
        welcomeSlogan: '',
        theme: '',
        bannerIconVisible: false,
        personalizationUpdated: false,
    },
    reducers: {
        setWelcomeSlogan: (state, action) => {
            state.welcomeSlogan = action.payload;
        },
        setTheme: (state, action) => {
            state.theme = action.payload;
        },
        setBannerIconVisible: (state, action) => {
            state.bannerIconVisible = action.payload;
        },
        setPersonalizationUpdated: (state, action) => {
            state.personalizationUpdated = action.payload;
        },
        clearForm: state => {
            state.welcomeSlogan = '';
            state.theme = '';
        }
    }
});

export const {
    setWelcomeSlogan,
    setTheme,
    setBannerIconVisible,
    setPersonalizationUpdated} = personalizationFormSlice.actions

export const {setErrorData} = postPersonalizationSlice.actions;

const personalizationReducer = combineReducers({
    form: personalizationFormSlice.reducer,
    fetchThemeHexes: fetchThemeHexesSlice.reducer,
    postPersonalization: postPersonalizationSlice.reducer
});

export default personalizationReducer;