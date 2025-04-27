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
                method: params.action === 'add' ? 'POST' : 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: state.id,
                    name: state.name,
                    address: state.address,
                    postalCode: state.postalCode,
                    city: state.city,
                    settings: {
                        id: state.settings.id,
                        restaurantId: state.settings.restaurantId,
                        openingTime: state.settings.openingTime.value,
                        closingTime: state.settings.closingTime.value
                    }
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
            newRestaurantFormActive: false,
            editRestaurantFormActive: false,
            restaurantContextMenuActive: false,
            contextMenuDetailsActive: false,
            newRestaurantCreated: false,
            restaurantUpdated: false,
            restaurantRemoved: false,
            removalActive: false,
            initialized: false,
            id: null,
            name: '',
            address: '',
            postalCode: '',
            city: '',
            settings: {
                id: null,
                restaurantId: null,
                openingTime: null,
                closingTime: null,
            },
            errorMessage: null
        },
        reducers: {
            setNewRestaurantFormActive: (state, action) => {
                state.newRestaurantFormActive = action.payload;
            },
            setEditRestaurantFormActive: (state, action) => {
                state.editRestaurantFormActive = action.payload;
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
            setRestaurantUpdated: (state, action) => {
                state.restaurantUpdated = action.payload;
            },
            setRestaurantRemoved: (state, action) => {
                state.restaurantRemoved = action.payload;
            },
            setRemovalActive: (state, action) => {
                state.removalActive = action.payload;
            },
            setInitialized: (state, action) => {
                state.initialized = action.payload;
            },
            setId: (state, action) => {
                state.id = action.payload
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
            setSettingsId: (state, action) => {
                state.settings.id = action.payload;
            },
            setSettingsRestaurantId: (state, action) => {
                state.settings.restaurantId = action.payload;
            },
            setOpeningTime: (state, action) => {
                state.settings.openingTime = action.payload;
            },
            setClosingTime: (state, action) => {
                state.settings.closingTime = action.payload;
            },
            setErrorMessage: (state, action) => {
                state.errorMessage = action.payload;
            },
            clearForm: state => {
                state.name = '';
                state.address = '';
                state.postalCode = '';
                state.city = '';
                state.settings = {
                    id: null,
                    restaurantId: null,
                    openingTime: null,
                    closingTime: null,
                };
            }
        }
    });

export const {
    setNewRestaurantFormActive,
    setEditRestaurantFormActive,
    setRestaurantContextMenuActive,
    setContextMenuDetailsActive,
    setNewRestaurantCreated,
    setRestaurantUpdated,
    setRestaurantRemoved,
    setRemovalActive,
    setInitialized,
    setId,
    setName,
    setAddress,
    setPostalCode,
    setCity,
    setSettingsId,
    setSettingsRestaurantId,
    setOpeningTime,
    setClosingTime,
    setErrorMessage,
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