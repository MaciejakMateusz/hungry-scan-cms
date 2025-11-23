import {combineReducers, createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {apiHost} from "../apiData";
import {getLanguage} from "../locales/langUtils";

export const getCurrentRestaurant = createAsyncThunk(
    'getCurrentRestaurant/getCurrentRestaurant',
    async (_, {rejectWithValue}) => {
        const response = await fetch(`${apiHost}/api/cms/restaurants/current`, {
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

        return await response.json();
    }
);

export const getCurrentRestaurantSlice = createSlice({
    name: 'getCurrentRestaurant',
    initialState: {
        isLoading: false
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCurrentRestaurant.pending, state => {
                state.isLoading = true;
            })
            .addCase(getCurrentRestaurant.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(getCurrentRestaurant.rejected, (state) => {
                state.isLoading = false;
            })
    }
});

export const getUserRestaurants = createAsyncThunk(
    'getUserRestaurants/getUserRestaurants',
    async (_, {rejectWithValue}) => {
        const response = await fetch(`${apiHost}/api/cms/restaurants`, {
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

        return await response.json();
    }
);

export const getUserRestaurantsSlice = createSlice({
    name: 'getUserRestaurants',
    initialState: {
        isLoading: false,
        restaurants: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserRestaurants.pending, state => {
                state.isLoading = true;
            })
            .addCase(getUserRestaurants.fulfilled, (state, action) => {
                state.isLoading = false;
                state.restaurants = action.payload?.map(restaurant => ({
                    value: restaurant,
                    label: restaurant.name
                }));
            })
            .addCase(getUserRestaurants.rejected, (state) => {
                state.isLoading = false;
            })
    }
});

export const dashboardSlice = createSlice(
    {
        name: 'view',
        initialState: {
            restaurant: null,
            downloadActive: false
        },
        reducers: {
            setRestaurant: (state, action) => {
                state.restaurant = action.payload;
            },
            setDownloadActive: (state, action) => {
                state.downloadActive = action.payload;
            }
        }
    });

export const {setRestaurant, setDownloadActive} = dashboardSlice.actions;

const dashboardReducer = combineReducers({
    view: dashboardSlice.reducer,
    getRestaurants: getUserRestaurantsSlice.reducer,
    getRestaurant: getCurrentRestaurantSlice.reducer
});

export default dashboardReducer;