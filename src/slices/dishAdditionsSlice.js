import {combineReducers, createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {apiHost} from "../apiData";
import {getDecodedJwt} from "../utils";
import {getTranslation} from "../locales/langUtils";

export const getIngredients = createAsyncThunk(
    'fetchIngredients/getIngredients',
    async (credentials, {rejectWithValue}) => {
        const requestBody = new Map();
        requestBody.set("pageSize", credentials.pageSize);
        requestBody.set("pageNumber", credentials.pageNumber);

        const params = Object.fromEntries(requestBody);
        const response = await fetch(`${apiHost}/api/cms/ingredients`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getDecodedJwt()}`
            },
            body: JSON.stringify(params)
        });

        if (!response.ok) {
            const errorData = await response.json();
            return rejectWithValue(errorData);
        }

        return {json: await response.json(), chosenAdditions: credentials.chosenAdditions};
    }
);

export const fetchIngredientsSlice = createSlice(
    {
        name: 'getIngredients',
        initialState: {
            isLoading: false,
            ingredients: [],
            additions: [],
            pageData: {}
        },
        reducers: {
            addAddition: (state, action) => {
                state.additions.push(action.payload);
                state.additions.sort((a, b) => getTranslation(a.name).localeCompare(getTranslation(b.name)));
                state.ingredients = state.ingredients.filter(i => i.id !== action.payload.id);
            },
            removeAddition: (state, action) => {
                state.additions = state.additions.filter(i => i.id !== action.payload.id);
                state.ingredients.push(action.payload);
                state.ingredients.sort((a, b) => getTranslation(a.name).localeCompare(getTranslation(b.name)));
            },
            setAdditions: (state, action) => {
                state.additions = action.payload;
            },
            setPageData: (state, action) => {
                state.pageNumber = action.payload;
            }
        },
        extraReducers: (builder) => {
            builder
                .addCase(getIngredients.pending, state => {
                    state.isLoading = true;
                })
                .addCase(getIngredients.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.additions = action.payload.chosenAdditions;
                    const chosenIds = action.payload.chosenAdditions.map(ingredient => ingredient.id);
                    const filteredIngredients = action.payload.json.content.filter(ingredient => !chosenIds.includes(ingredient.id));
                    state.pageData = action.payload.json
                    state.ingredients = filteredIngredients
                })
                .addCase(getIngredients.rejected, (state) => {
                    state.isLoading = false;
                })
        }
    });

export const dishAdditionsSlice = createSlice({
    name: 'dishAdditionsData',
    initialState: {
        filterValue: '',
        filterExpanded: false
    },
    reducers: {
        setFilterValue: (state, action) => {
            state.filterValue = action.payload;
        },
        setFilterExpanded: (state, action) => {
            state.filterExpanded = action.payload;
        }
    }
});

export const {
    setFilterValue,
    setFilterExpanded
} = dishAdditionsSlice.actions

export const {
    addAddition,
    removeAddition,
    setAdditions,
    setPageData
} = fetchIngredientsSlice.actions;


const dishAdditionsReducer = combineReducers({
    dishAdditionsData: dishAdditionsSlice.reducer,
    fetchIngredients: fetchIngredientsSlice.reducer
});

export default dishAdditionsReducer;