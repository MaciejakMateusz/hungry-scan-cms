import {combineReducers, createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {apiHost} from "../apiData";
import {getLanguage} from "../locales/langUtils";

export const fetchIngredients = createAsyncThunk(
    'fetchIngredients/fetchIngredients',
    async (_, {rejectWithValue}) => {
        const response = await fetch(`${apiHost}/api/cms/ingredients`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept-Language': getLanguage()
            },
            credentials: 'include'
        });

        if (!response.ok) {
            const errorData = await response.json();
            return rejectWithValue(errorData);
        }

        try {
            return await response.json();
        } catch (error) {
            return [];
        }
    }
);

export const fetchIngredientsSlice = createSlice({
    name: 'fetchIngredients',
    initialState: {
        isLoading: false,
        ingredients: [],
        chosenAdditions: []
    },
    reducers: {
        setIngredients: (state, action) => {
            state.ingredients = action.payload;
        },
        setChosenAdditions: (state, action) => {
            state.chosenAdditions = action.payload;
        },
        clearAdditions: (state) => {
            state.ingredients = [];
            state.chosenAdditions = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchIngredients.pending, state => {
                state.isLoading = true;
            })
            .addCase(fetchIngredients.fulfilled, state => {
                state.isLoading = false;
            })
            .addCase(fetchIngredients.rejected, state => {
                state.isLoading = false;
            });
    }
});

export const {
    setChosenAdditions,
    clearAdditions,
    setIngredients
} = fetchIngredientsSlice.actions;

const dishAdditionsReducer = combineReducers({
    fetchIngredients: fetchIngredientsSlice.reducer
});

export default dishAdditionsReducer;