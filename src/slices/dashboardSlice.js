import {combineReducers, createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {apiHost} from "../apiData";

export const getUserRestaurants = createAsyncThunk(
    'getUserRestaurants/getUserRestaurants',
    async (_, {rejectWithValue}) => {
        const response = await fetch(`${apiHost}/api/cms/restaurants`, {
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
            restaurant: null
        },
        reducers: {
            setRestaurant: (state, action) => {
                state.restaurant = action.payload;
            }
        }
    });

export const {setRestaurant} = dashboardSlice.actions;

const dashboardReducer = combineReducers({
    view: dashboardSlice.reducer,
    restaurants: getUserRestaurantsSlice.reducer
});

export default dashboardReducer;