import {combineReducers, createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {apiHost} from "../apiData";


export const switchRestaurant = createAsyncThunk(
    'switchRestaurant',
    async (params, {rejectWithValue}) => {
        try {
            const restaurantId = params.restaurantId;
            if (!restaurantId) return;
            const response = await fetch(`${apiHost}/api/user/restaurant`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(restaurantId),
                credentials: 'include'
            });

            if (!response.ok) {
                const data = await response.json();
                return rejectWithValue(data);
            }

            try {
                return await response.json();
            } catch (error) {
                return {};
            }
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

export const switchRestaurantSlice = createSlice(
    {
        name: 'switchRestaurant',
        initialState: {
            isLoading: false,
            errorData: null
        },
        extraReducers: (builder) => {
            builder.addCase(switchRestaurant.pending, state => {
                state.isLoading = true;
                state.notAuthorized = false;
            }).addCase(switchRestaurant.fulfilled, state => {
                state.isLoading = false;
            }).addCase(switchRestaurant.rejected, (state, action) => {
                state.isLoading = false;
                state.errorData = action.payload;
            })
        }
    }
)

export const postRestaurant = createAsyncThunk(
    'postRestaurant',
    async (params, {getState, rejectWithValue}) => {
        try {
            const state = getState().restaurant.form;
            const response = await fetch(`${apiHost}/api/cms/restaurants/${params.action}`, {
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

            if (!response.ok) {
                const data = await response.json();
                return rejectWithValue(data);
            }

            try {
                return await response.json();
            } catch (error) {
                return {};
            }
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

export const postRestaurantSlice = createSlice(
    {
        name: 'postRestaurant',
        initialState: {
            isLoading: false,
            errorData: null
        },
        reducers: {
            setErrorData: (state, action) => {
                state.errorData = action.payload;
            }
        },
        extraReducers: (builder) => {
            builder.addCase(postRestaurant.pending, state => {
                state.isLoading = true;
                state.notAuthorized = false;
            }).addCase(postRestaurant.fulfilled, state => {
                state.isLoading = false;
            }).addCase(postRestaurant.rejected, (state, action) => {
                state.isLoading = false;
                state.errorData = action.payload;
            })
        }
    }
)

export const createInitialRestaurant = createAsyncThunk(
    'createInitialRestaurant',
    async (_, {getState, rejectWithValue}) => {
        try {
            const state = getState().restaurant.form;
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

export const createInitialRestaurantSlice = createSlice(
    {
        name: 'createInitialRestaurant',
        initialState: {
            isLoading: false,
            notAuthorized: false,
            errorData: null
        },
        extraReducers: (builder) => {
            builder.addCase(createInitialRestaurant.pending, state => {
                state.isLoading = true;
                state.notAuthorized = false;
            }).addCase(createInitialRestaurant.fulfilled, (state, action) => {
                state.isLoading = false;
                state.notAuthorized = false;
                window.location.href = action.payload.redirectUrl;
            }).addCase(createInitialRestaurant.rejected, (state, action) => {
                state.isLoading = false;
                state.notAuthorized = true;
                state.errorData = action.payload;
            })
        }
    }
)

export const formSlice = createSlice(
    {
        name: 'form',
        initialState: {
            restaurantFormActive: false,
            restaurantContextMenuActive: false,
            contextMenuDetailsActive: false,
            newRestaurantCreated: false,
            removalActive: false,
            initialized: false,
            name: '',
            address: '',
            postalCode: '',
            city: ''
        },
        reducers: {
            setRestaurantFormActive: (state, action) => {
                state.restaurantFormActive = action.payload;
            },
            setRestaurantContextMenuActive: (state, action) => {
                state.restaurantContextMenuActive = action.payload;
            },
            setContextMenuDetailsActive: (state, action) => {
                state.contextMenuDetailsActive = action.payload;
            },
            setNewRestaurantCreated: (state, action) => {
                state.newRestaurantCreated = action.payload;
            },
            setRemovalActive: (state, action) => {
                state.removalActive = action.payload;
            },
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
            clearForm: state => {
                state.name = '';
                state.address = '';
                state.postalCode = '';
                state.city = '';
            }
        }
    });

export const {
    setRestaurantFormActive,
    setRestaurantContextMenuActive,
    setContextMenuDetailsActive,
    setNewRestaurantCreated,
    setRemovalActive,
    setInitialized,
    setName,
    setAddress,
    setPostalCode,
    setCity,
    clearForm
} = formSlice.actions;

export const {setErrorData} = postRestaurantSlice.actions;

const createRestaurantReducer = combineReducers({
    form: formSlice.reducer,
    postInitial: createInitialRestaurantSlice.reducer,
    post: postRestaurantSlice.reducer,
    switch: switchRestaurantSlice.reducer
});

export default createRestaurantReducer;