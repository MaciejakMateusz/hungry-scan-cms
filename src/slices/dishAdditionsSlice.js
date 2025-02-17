import {combineReducers, createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {apiHost} from "../apiData";
import {getTranslation} from "../locales/langUtils";

export const fetchIngredients = createAsyncThunk(
    'fetchIngredients/fetchIngredients',
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
        setChosenAdditions: (state, action) => {
            const selectedAdditions = action.payload;

            const selectedIds = new Set(selectedAdditions.map(item => item.value.id));
            const currentIds = new Set(state.chosenAdditions.map(item => item.value.id));

            const removedAdditions = state.chosenAdditions.filter(item => !selectedIds.has(item.value.id));
            const addedAdditions = selectedAdditions.filter(item => !currentIds.has(item.value.id));

            state.chosenAdditions = selectedAdditions;

            state.ingredients.push(...removedAdditions.map(item => ({
                value: item.value,
                label: getTranslation(item.value.name)
            })));

            state.ingredients = state.ingredients.filter(ingredient => !addedAdditions.find(addition => addition.value.id === ingredient.value.id));
            state.ingredients.sort((a, b) =>
                getTranslation(a.value.name).localeCompare(getTranslation(b.value.name))
            );
        },
        clearAdditions: (state) => {
            state.ingredients = [];
            state.chosenAdditions = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchIngredients.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchIngredients.fulfilled, (state, action) => {
                state.isLoading = false;

                const formattedIngredients = action.payload.map(ingredient => ({
                    value: ingredient,
                    label: getTranslation(ingredient.name)
                }));

                const chosenAdditionsIds = new Set(state.chosenAdditions.map(item => item.value.id));

                state.ingredients = formattedIngredients.filter(ingredient => !chosenAdditionsIds.has(ingredient.value.id));

                state.ingredients.sort((a, b) =>
                    getTranslation(a.value.name).localeCompare(getTranslation(b.value.name))
                );
            })
            .addCase(fetchIngredients.rejected, (state) => {
                state.isLoading = false;
            });
    }
});

export const {setChosenAdditions, clearAdditions} = fetchIngredientsSlice.actions;

const dishAdditionsReducer = combineReducers({
    fetchIngredients: fetchIngredientsSlice.reducer
});

export default dishAdditionsReducer;