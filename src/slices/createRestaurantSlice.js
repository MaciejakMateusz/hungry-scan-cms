import {combineReducers, createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {apiHost} from "../apiData";


export const executeCreateRestaurantFetch = createAsyncThunk(
    'createRestaurantFetch/executeCreateRestaurantFetch',
    async (_, { getState, rejectWithValue }) => {
        try {
            const state = getState().createRestaurant.createRestaurantForm;
            const response = await fetch(`${apiHost}/api/cms/restaurants/create-first`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: state.name,
                    address: state.address,
                    postalCode: state.postalCode,
                    city: state.city
                }),
                credentials: 'include'
            });

            const data = await response.json();

            if (!response.ok) {
                return rejectWithValue(data);
            }

            return data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

export const createRestaurantSlice = createSlice(
    {
        name: 'createRestaurantFetch',
        initialState: {
            isLoading: false,
            notAuthorized: false,
            errorData: null
        },
        extraReducers: (builder) => {
            builder.addCase(executeCreateRestaurantFetch.pending, state => {
                state.isLoading = true;
                state.notAuthorized = false;
            }).addCase(executeCreateRestaurantFetch.fulfilled, (state, action) => {
                state.isLoading = false;
                state.notAuthorized = false;
                window.location.href = action.payload.redirectUrl;
            }).addCase(executeCreateRestaurantFetch.rejected, (state, action) => {
                state.isLoading = false;
                state.notAuthorized = true;
                state.errorData = action.payload;
            })
        }
    }
)

export const createRestaurantFormSlice = createSlice(
    {
        name: 'createRestaurantForm',
        initialState: {
            initialized: false,
            name: '',
            address: '',
            postalCode: '',
            city: ''
        },
        reducers: {
            setInitialized: (state, action) => {
                state.initialized = action.payload;
            },
            setName: (state, action) => {
                state.name = action.payload
            },
            setAddress: (state, action) => {
                state.address = action.payload
            },
            setPostalCode: (state, action) => {
                state.postalCode = action.payload
            },
            setCity: (state, action) => {
                state.city = action.payload
            },
        }
    });

export const {setInitialized, setName, setAddress, setPostalCode, setCity} = createRestaurantFormSlice.actions;

const createRestaurantReducer = combineReducers({
    createRestaurantForm: createRestaurantFormSlice.reducer,
    createRestaurantFetch: createRestaurantSlice.reducer,
});

export default createRestaurantReducer;